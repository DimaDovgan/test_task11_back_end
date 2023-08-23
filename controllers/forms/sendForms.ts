import express, { Express, Request, Response } from 'express';
import Patient from '../../models/patient'
import Doctor from '../../models/Doctor'
import Appointmens from '../../models/Appointment'

function validate_date(value:any)
{
  var arrD = value.split(".");
    arrD[1] -= 1;
  var d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {
    // alert("Введена некорректная дата!");
    console.log("invalide date")
    return false;
  }
}


const auditPatient=async(patientString:String,patientZvit:any)=>{
    const patientsArr = patientString.split("\n");
     for (let index = 0; index < patientsArr.length; index++) {
        const patient=patientsArr[index];
        const patientSuccesful:{id:null | String,time:null | Array<string>,name:null | String,dateBirsday:null | String}={
            id:null,
            time:null,
            name:null,
            dateBirsday:null,
        }
        const arrInfPatient=patient.split(",");
        const patientObj={};
        const patientId=arrInfPatient[0];
        console.log("Number.isInteger(parseFloat(patientId))",Number.isInteger(parseFloat(patientId)))
        if(Number.isInteger(parseFloat(patientId))){

            const auth = await Patient.findOne({ id: patientId});
            console.log("auth",auth)
      if (auth) {
        console.log("id duplicates")
        patientZvit.duplicates.push(patient);
        continue;
        }
        else{
            console.log("uniq id vse ok")
            patientSuccesful.id=patientId;
        }
        }
        else{
            console.log("id wrong")
            patientZvit.wrong.push(patient);
            continue;
        }
        /////
        const patientTime=arrInfPatient[1].split("-");
        
        if(patientTime.length===2){
            console.log(patientTime,"patientTime")
            const timePatient=arrInfPatient[1];
            const patientTime1bool=Number.isInteger(parseFloat(patientTime[0]));
            const patientTime2bool=Number.isInteger(parseFloat(patientTime[1]));
            const patientTime1=parseFloat(patientTime[0]);
            const patientTime2=parseFloat(patientTime[1]);

            if(patientTime1bool && patientTime2bool && patientTime1>0 && patientTime1<24 && patientTime2>0 && patientTime2<24 && patientTime2>patientTime1){
                console.log(patientTime,"patientTime")
                patientSuccesful.time=patientTime;
                
            }
            else{
                patientZvit.wrong.push(patient);
                continue;
            }
        }
        ///////
        if(arrInfPatient[2]){
            const patienDate=arrInfPatient[2].split(".");
            const patienName=arrInfPatient[2].split(" ");
            if(patienDate.length===3){
                if(validate_date(arrInfPatient[2])){
                    patientSuccesful.dateBirsday=arrInfPatient[2];
                }
                else{
                    
                        patientZvit.wrong.push(patient);
                        continue;
                
            }}
            else if(patienName.length==1 || patienName.length==2 ){
            if(patienName.length==1){
                const firstLitera= patienName[0].split("")[0];
                var isUpperCase = firstLitera.toUpperCase()==firstLitera;
                if(isUpperCase){
                    patientSuccesful.name=arrInfPatient[2]
                }
                else{
                        patientZvit.wrong.push(patient);
                        continue;
                }
            }
            if(patienName.length==2){
                const firstLitera= patienName[0].split("")[0];
                const secondLitera= patienName[1].split("")[0];
                var isUpperCaseFirst = firstLitera.toUpperCase()==firstLitera;
                var isUpperCaseSecond =secondLitera.toUpperCase()==secondLitera;
                if(isUpperCaseFirst && isUpperCaseSecond){
                    patientSuccesful.name=arrInfPatient[2]
                }
                else{
                        patientZvit.wrong.push(patient);
                        continue;
                }
            }
            }
        }
        if(arrInfPatient[3]){
            const patienDate=arrInfPatient[3].split(".");
            const patienName=arrInfPatient[3].split(" ");
            if(patienDate.length===3){
                if(validate_date(arrInfPatient[3])){
                    patientSuccesful.dateBirsday=arrInfPatient[3];
                }
                else{
                        patientZvit.wrong.push(patient);
                        continue;
            }}
            else if(patienName.length==1 || patienName.length==2 ){
            if(patienName.length==1){
                const firstLitera= patienName[0].split("")[0];
                var isUpperCase = firstLitera.toUpperCase()==firstLitera;
                if(isUpperCase){
                    patientSuccesful.name=arrInfPatient[3]
                }
                else{
                        patientZvit.wrong.push(patient);
                        continue;
                    
                }
            }
            if(patienName.length==2){
                const firstLitera= patienName[0].split("")[0];
                const secondLitera= patienName[1].split("")[0];
                var isUpperCaseFirst = firstLitera.toUpperCase()==firstLitera;
                var isUpperCaseSecond =secondLitera.toUpperCase()==secondLitera;
                if(isUpperCaseFirst && isUpperCaseSecond){
                    patientSuccesful.name=arrInfPatient[3]
                }
                else{
                        patientZvit.wrong.push(patient);
                        continue;
                }
            }
            }
        }
        console.log("patientSuccesful",patientSuccesful)
        patientZvit.succesful.push(patient);
        const patientSendDateBase = await Patient.create(patientSuccesful);
        console.log("patientSendDateBase",patientSendDateBase)
        
     }
     return patientZvit;

}
const auditDoctor=async(doctorString:String,doctorZvit:any)=>{
    const doctorArr =doctorString.split("\n");
     for (let index = 0; index < doctorArr.length; index++) {
        const doctor=doctorArr[index];
        const doctorSuccesful:{id:null | String,time:null | Array<string>,name:null | String,dateBirsday:null | String}={
            id:null,
            time:null,
            name:null,
            dateBirsday:null,
        }
        const arrInDoctor=doctor.split(",");
        const doctorId=arrInDoctor[0];
        console.log("Number.isInteger(parseFloat(doctorId))",Number.isInteger(parseFloat(doctorId)))
        if(Number.isInteger(parseFloat(doctorId))){

            const auth = await Doctor.findOne({ id: doctorId});
            // console.log("auth",auth)
      if (auth) {
        console.log("id duplicates")
        doctorZvit.duplicates.push(doctor);
        continue;
        }
        else{
            console.log("uniq id vse ok")
            doctorSuccesful.id=doctorId;
        }
        }
        else{
            console.log("id wrong")
            doctorZvit.wrong.push(doctor);
            continue;
        }
        /////
        const doctorTime=arrInDoctor[1].split("-");
        
        if(doctorTime.length===2){
            console.log(doctorTime,"patientTime")
            //const doctorPatient=arrInDoctor[1];
            const doctorTime1bool=Number.isInteger(parseFloat(doctorTime[0]));
            const doctorTime2bool=Number.isInteger(parseFloat(doctorTime[1]));
            const doctorTime1=parseFloat(doctorTime[0]);
            const doctorTime2=parseFloat(doctorTime[1]);

            if(doctorTime1bool && doctorTime2bool && doctorTime1>0 && doctorTime1<24 && doctorTime2>0 && doctorTime2<24 && doctorTime2>doctorTime1){
                console.log(doctorTime,"patientTime")
                doctorSuccesful.time=doctorTime;
                
            }
            else{
                doctorZvit.wrong.push(doctor);
                continue;
            }
        }
        ///////
        if(arrInDoctor[2]){
            const doctorDate=arrInDoctor[2].split(".");
            const doctorName=arrInDoctor[2].split(" ");
            if(doctorDate.length===3){
                if(validate_date(arrInDoctor[2])){
                    doctorSuccesful.dateBirsday=arrInDoctor[2];
                }
                else{
                    
                        doctorZvit.wrong.push(doctor);
                        continue;
                
            }}
            else if(doctorName.length==1 || doctorName.length==2 ){
            if(doctorName.length==1){
                const firstLitera= doctorName[0].split("")[0];
                var isUpperCase = firstLitera.toUpperCase()==firstLitera;
                if(isUpperCase){
                    doctorSuccesful.name=arrInDoctor[2]
                }
                else{
                        doctorZvit.wrong.push(doctor);
                        continue;
                }
            }
            if(doctorName.length==2){
                const firstLitera= doctorName[0].split("")[0];
                const secondLitera= doctorName[1].split("")[0];
                var isUpperCaseFirst = firstLitera.toUpperCase()==firstLitera;
                var isUpperCaseSecond =secondLitera.toUpperCase()==secondLitera;
                if(isUpperCaseFirst && isUpperCaseSecond){
                    doctorSuccesful.name=arrInDoctor[2]
                }
                else{
                        doctorZvit.wrong.push(doctor);
                        continue;
                }
            }
            }
        }
        ///////
        if(arrInDoctor[3]){
            const doctorDate=arrInDoctor[3].split(".");
            const doctorName=arrInDoctor[3].split(" ");
            if(doctorDate.length===3){
                if(validate_date(arrInDoctor[3])){
                    doctorSuccesful.dateBirsday=arrInDoctor[2];
                }
                else{
                    
                        doctorZvit.wrong.push(doctor);
                        continue;
                
            }}
            else if(doctorName.length==1 || doctorName.length==2 ){
            if(doctorName.length==1){
                const firstLitera= doctorName[0].split("")[0];
                var isUpperCase = firstLitera.toUpperCase()==firstLitera;
                if(isUpperCase){
                    doctorSuccesful.name=arrInDoctor[3]
                }
                else{
                        doctorZvit.wrong.push(doctor);
                        continue;
                }
            }
            if(doctorName.length==2){
                const firstLitera= doctorName[0].split("")[0];
                const secondLitera= doctorName[1].split("")[0];
                var isUpperCaseFirst = firstLitera.toUpperCase()==firstLitera;
                var isUpperCaseSecond =secondLitera.toUpperCase()==secondLitera;
                if(isUpperCaseFirst && isUpperCaseSecond){
                    doctorSuccesful.name=arrInDoctor[3]
                }
                else{
                        doctorZvit.wrong.push(doctor);
                        continue;
                }
            }
            }
        }
        
        
        doctorZvit.succesful.push(doctor);
        const patientSendDateBase = await Doctor.create(doctorSuccesful);
}

        return doctorZvit;
}
const auditAppointmens=async(AppointmensString:String,AppointmensZvit:any)=>{
    const AppointmensArr =AppointmensString.split("\n");
    console.log("AppointmensArr",AppointmensArr);
     for (let index = 0; index < AppointmensArr.length; index++) {
        const appointmen=AppointmensArr[index];
        const AppointmenSuccesful:{idPatient:null | String,idDoctor:null | string,time:null | String}={
            idPatient:null,
            idDoctor:null,
            time:null
        }
        const arrInAppointmens=appointmen.split(",");
        const idPatient=arrInAppointmens[0];
        const idDoctor=arrInAppointmens[1];
        const time=arrInAppointmens[2];
       if(idPatient){
        const auth = await Patient.findOne({ id: idPatient});
        console.log("auth Patient",auth)
        if(!auth){
            AppointmensZvit.wrong.push(appointmen);
            continue;
        }
        else{
            AppointmenSuccesful.idPatient=idPatient;
        }
       }
       // idDoctor
       if(idDoctor){
        const auth = await Doctor.findOne({ id: idDoctor});
        console.log("auth Doctor",auth)
        if(!auth){
            AppointmensZvit.wrong.push(appointmen);
            continue;
        }
        else{
            AppointmenSuccesful.idDoctor=idDoctor;
        }

       }
       // time
       if(time){
        const timebool=Number.isInteger(parseFloat(time));
            const timeValue=parseFloat(time);
            if(timebool && timeValue>0 && timeValue<24){
                AppointmenSuccesful.time=time;
            }
            else{
                AppointmensZvit.wrong.push(appointmen);
            continue;
            }
       }
       AppointmensZvit.succesful.push(appointmen);
       console.log("before send to datebase")
        const apointmentSendDateBase = await Appointmens.create(AppointmenSuccesful);
        console.log("apointmentSendDateBase",apointmentSendDateBase)
    }
    return AppointmensZvit

}

const sendForms=async(req:Request,res:Response)=>{
    console.log("this is send form !!!!!!")

     const patientZvit:{succesful:any[],wrong:any[],duplicates:any[]}={
        succesful:[] ,  
        wrong:[],
        duplicates:[]
    }

        const doctorZvit:{succesful:any[],wrong:any[],duplicates:any[]}={
            succesful:[] ,  
            wrong:[],
            duplicates:[]
    
         }
         const appointmensZvit:{succesful:any[],wrong:any[],duplicates:any[]}={
            succesful:[] ,  
            wrong:[],
            duplicates:[]
    
         }
     
    const formBody=req.body;
    
    const zvitPatients= await auditPatient(formBody.patients,patientZvit);
    
    //auditDoctor(formBody.doctors,patientZvit).then(console.log)
    //console.log(await auditDoctor(formBody.doctors,patientZvit))
    let zvitDoctors= await auditDoctor(formBody.doctors,doctorZvit);
    console.log("ggg",zvitDoctors);
    let zvitAppointmens= await auditAppointmens(formBody.appointments,appointmensZvit)
    console.log("ffff",zvitAppointmens);
    // console.log("zvitPatients", await auditPatient(formBody.patients,patientZvit))
     
    res.status(201).json({patient:zvitPatients,doctors:zvitDoctors,appointments: zvitAppointmens})

}

export default sendForms;