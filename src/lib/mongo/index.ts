

import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URI as string

const ConnectMongodb =  async () => {
    try{
        
        await mongoose.connect(MONGODB_URL)
    }catch (error){
        console.log(error)
    }
}


export default ConnectMongodb;


