import axios from 'axios'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore=create((set,get)=>({
    listOfTransport:[],
    category:[],
    loader:false,
    getAllTransport:async()=>{
        const response=await axios.get('http://194.8.147.150:3016/transport')
        const data= response.data
        set({listOfTransport:data})
    },
    addTransport:async(transport)=>{
        try {
        const response=await axios.post('http://194.8.147.150:3016/add-transport',{transport:transport})
        const data= response.data
        set({listOfTransport:[...get().listOfTransport,data]})  
     
    } catch (error) {
            console.log(error);
        }
    },
    editedTransport:async(id,transport)=>{
        try {
            
       
        const response=await axios.put('http://194.8.147.150:3016/edited-transport',{id:id,transport:transport})
        const data= response.data
       
        // set({listOfTransport:[...get().listOfTransport,data]})
 } catch (error) {
            
        }
    },
    deleteTransport:async(id)=>{
        try {
            console.log("IDDDDDDDDDDDDD",id);
        const response=await axios.post('http://194.8.147.150:3016/delete-transport',{id:id})
        const data= response.data
        set({listOfTransport:[...get().listOfTransport.filter(e=>e._id!=id)]})
 } catch (error) {
            
        }
    },
    stopTransport:async (id,stopPlay)=>{
        try {
         set({... get(),loader:true})   
            const response=await axios.post('http://194.8.147.150:3016/stopPlayDevice',{id:id,stopPlay:stopPlay})
            const data= response.data
             await get().getAllTransport()
          
        } catch (error) {
            set({... get(),loader:false})  
        }
        finally {
            set({... get(),loader:false})  
        }
    },
    startTransport:async (id,stopPlay)=>{
        try {
         set({... get(),loader:true})   
            const response=await axios.post('http://194.8.147.150:3016/stopPlayDevice',{id:id,stopPlay:stopPlay})
            const data= response.data
             await get().getAllTransport()
          
        } catch (error) {
            set({... get(),loader:false})  
        }
        finally {
            set({... get(),loader:false})  
        }
    },
    activateBilling:async (id,on_of)=>{
        try {
         set({... get(),loader:true})   
            const response=await axios.post('http://194.8.147.150:3016/billing-on-off',{id:id,on_of:on_of})
            const data= response.data
             await get().getAllTransport()
          
        } catch (error) {
            set({... get(),loader:false})  
        }
        finally {
            set({... get(),loader:false})  
        }
    },
    skipChecked:async (id,checked)=>{
        try {
         set({... get(),loader:true})   
            const response=await axios.post('http://194.8.147.150:3016/skip-checked',{id:id,checked:checked})
            const data= response.data
           
             await get().getAllTransport()
          
        } catch (error) {
            set({... get(),loader:false})  
        }
        finally {
            set({... get(),loader:false})  
        }
    },
      logIn:async(login,pass)=>{
        let resp= await axios.post("http://194.8.147.150:3016/login",{login:login.trim(),password:pass.trim()})
        let data=resp.data
        if(data.flag){
            return true
        }else return false
       },
  getCategoryByName:(name)=>{
    console.log(get().listOfTransport);
     return get().listOfTransport.filter(element=>element.id_cat.name==name)
  },
    getAllCategory:async()=>{
        const response=await axios.get('http://194.8.147.150:3016/category')
        const data= response.data
    
        const response1=await axios.get('http://194.8.147.150:3016/transport')
        const data1= response1.data
        set({listOfTransport:data1,category:data})
    },
    addCategory:async(name)=>{
        const response=await axios.post('http://194.8.147.150:3016/add-category',{name:name})
        const data= response.data
        set({category:[...get().category,data]})
        
    },
    


}))

export default useStore

// "transport":{
//     "adress":"тестова адреса",
//     "id_cat":"64eddef556674eeeb2580da0",
//       "vlan":"тестовий влан",
//       "login":"тестовий логін",
//       "point_access":{
//         "notification_point":"",
//         "ip":"172.16.23.14",
//         "onu":"e0e8.e6d4.0ea7",
//         "port":""
  
//       },
//       "notification":"",
//       "biling_info":{
//           "bill":"",
//           "state":""
//       }
//   }