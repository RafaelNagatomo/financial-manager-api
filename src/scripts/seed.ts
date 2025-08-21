import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@user/infrastructure/userOrm.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});

async function seedUser() {
  await dataSource.initialize();
  console.log('Database connected');

  const userData = {
    firstName: 'Rafael',
    lastName: 'Nagatomo',
    timeZone: 'America/Sao_Paulo',
    email: 'rafael@gmail.com',
    password: '123456',
  };

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const user = dataSource.manager.create(User, {
    ...userData,
    password: hashedPassword,
  });

  await dataSource.manager.save(user);
  console.log('User inserted:', { id: user.id, email: user.email });

  await dataSource.destroy();
  console.log('Database connection closed');
}

seedUser().catch((err) => {
  console.error('Error seeding user:', err);
  process.exit(1);
});
