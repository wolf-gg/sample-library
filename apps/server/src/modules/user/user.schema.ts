import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
