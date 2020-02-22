import axios from 'axios'
import * as constant from '../../Constants/index'

/**
 * GET CERTIFYING TRAINING
 * @returns Array
 */

 export const getTrainingByType = () =>{
     return new Promise((resolve, reject)=>{
         axios.get(constant.END_POINT + '/training/show/all/type/Certifiante')
         .then((types)=>{
             resolve(types.data)
         })
         .catch((err)=>{
             reject(err)
         })
     })
 }
