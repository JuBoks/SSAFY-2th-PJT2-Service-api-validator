import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Api } from 'src/apis/entities/api.entity';
import { TestCase } from 'src/apis/entities/testcase.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CustomRequest } from 'src/common/custromrequest';
import { Domain } from 'src/domains/entities/domain.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from './entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    private dataSource: DataSource,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService
  ){}

  async findAll(req:CustomRequest): Promise<TestCase[]>{
     return await this.dataSource
    .createQueryBuilder()
    .from(Metadata, "metadata")
    .leftJoinAndSelect(Api, "api", "api.api_id = metadata.api_id")
    .leftJoinAndSelect(Domain, "domain", "domain.domain_id = api.domain_id")
    .leftJoinAndSelect(Category, "category", "category.category_id = domain.category_id")
    .where((qb) => {
        const subQuery = qb
            .subQuery()
            .select("meta_id")
            .from(Alert, "alerts")
            .where("alerts.user_id = :uid")
            .getQuery()
        return "metadata.meta_id IN " + subQuery
    })
    .andWhere("metadata.state = 0")
    .setParameter("uid", req.user.uid)
    .select(["metadata.meta_id",
    "category.name",
    "domain.domain", 
    "api.resources",
    "api.method",
    "metadata.header",
    "metadata.params",
    "metadata.body",
    "metadata.name", 
    "metadata.cycle_time",
    "metadata.last_req_time"])
    .getRawMany();
    
  }

  async create(createAlertDto: CreateAlertDto, req:CustomRequest) {
    const uid = req.user.uid;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      for (const id of createAlertDto.apis){
        const alert = new Alert();
        alert.user_id = uid;
        alert.meta_id = id;
        
        await queryRunner.manager.save(alert);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        err.message,
        HttpStatus.NOT_ACCEPTABLE,
      )
    } finally{
      await queryRunner.release();
    }
    return "success";
  }

  async remove(id: number, req:CustomRequest) {
    return await this.dataSource
    .getRepository(Alert)
    .createQueryBuilder('alerts')
    .delete()
    .where("user_id = :uid", { uid: req.user.uid })
    .andWhere("meta_id = :id", { id: id})
    .execute()
  }

  async notice(id: number) {
    const list = await this.dataSource
    .getRepository(Alert)
    .createQueryBuilder('alerts')
    .where("meta_id = :id", { id: id})
    .select("user_id")
    .execute()
    this.mail(list);
  }



  public async mail(list: Array<Alert>): Promise<void> {
    for (const alert of list) {
      const user =  await this.usersService.findOne(alert.user_id);
      console.log(user);
      this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {})
      .catch((e) => {throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST
      )
      });
    }
  }
}
