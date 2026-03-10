export interface User{
    id:string,
    username:string,
    password:string
}


export interface Service_{
    serviceImage:File,
    serviceBanner:File,
    _id?:string | null,
    serviceName:string,
    servicePoints:string[],
    serviceDescription:string,
    created_at?:string | null,
    isActive?:boolean | null,
}

export interface ServiceUI{
    serviceImage:{
        url:string,
        public_id:string
    },
    serviceBanner:{
        url:string,
        public_id:string
    },
    _id?:string | null,
    serviceName:string,
    servicePoints:string[],
    serviceDescription:string,
    created_at?:string | null,
    isActive?:boolean | null,
}

export interface DeleteModalProp{
    isopen : boolean,
    onClose : () => void,
    onConform : (choice : "yes" | "no") => void
}


export interface LinkGroupProp{
    children : React.ReactNode,
    header : string
}




export interface BookType{
    _id?: string,
    username : string,
    number : string,
    place : string,
    scheduledDate : string,
    scheduledTime : string,
    service : string,
    commands? : string | null,
    created_at? : string | null
}

export type Review = {
  _id: string
  reviewText: number
  created_at? : string
}






