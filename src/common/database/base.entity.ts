import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'bigint', unique: true })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  private generateRandomId(): number {
    return Math.floor(10_000_000_000 + Math.random() * 900_000_000_000);
  }

  @BeforeInsert()
  async generateId() {
    let attempts = 5;

    while (attempts > 0) {
      this.id = this.generateRandomId();

      try {
        return;
      } catch (error) {          
        if (error?.code === '23505') {
          attempts -= 1;
          continue;
        }
        throw error;
      }
    }

    throw new Error('Unique ID generate qilib bo‘lmadi (retry failed)');
  }
}
