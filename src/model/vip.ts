import mongoose, { mongo } from 'mongoose';

const vipSchema = new mongoose.Schema({
    local: {
        username: String
    }
});

const model = mongoose.model('vip', vipSchema);

export default model;

export async function isVip(name: string): Promise<boolean> {
  const res = await model.findOne({local: {username: name}}).exec();
  console.log(JSON.stringify(res));
  if (res !== null) {
      return res.get('local.username') === name;
  }
  return false;
}