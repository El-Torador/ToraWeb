import axios from 'axios'
import * as types from '../../Constants/index'

/**
 * GET DISCIPLINE
 * @returns Array
 */

 export const getDiscipline = () =>{
     return new Promise((resolve, reject)=>{
         axios.get(types.END_POINT+'/discipline/show/all')
         .then((disciplines)=>{
             resolve(disciplines.data)
         })
         .catch((err)=>{
             reject(err)
         })
     })
 }

 /**
  * GET DISCIPLINE BY ID
  * @param {Number} id
  * @returns Object
  */
    export const getDisciplineById = id =>{
        return new Promise((resolve, reject)=>{
            axios.get(types.END_POINT+'/discipline/show/'+id)
            .then((discipline)=>{
                resolve(discipline.data)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
 /**
  * GET DISCIPLINE BY ID_MODULE
  * @param {Number} id_module
  * @returns Array
  */

  export const getDisciplineByIdModule = id_module=>{
    return new Promise((resolve, reject)=>{
        axios.get(types.END_POINT+'/discipline/show/module/'+id_module)
        .then((discipline)=>{
            resolve(discipline.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
  }

  /**
   * ADD DISCIPLINE
   * @param {String} options.name
   * @param {Number} options.hours
   * @param {String} options.description
   * @param {Array} options.skills
   * @param {Number} options.cost
   * @param {Number} options.module_id
   */

   export const addDiscipline = options =>{
       return new Promise((resolve, reject)=>{
           axios.post(types.END_POINT+'/discipline/add', options, types.config)
           .then((message)=>{
               resolve(message.data.message)
           })
           .catch((err)=>{
               reject(err)
           })
       })
   }

   /**
   * UPDATE DISCIPLINE
   * @param {String} options.name
   * @param {Number} options.hours
   * @param {String} options.description
   * @param {Array} options.skills
   * @param {Number} options.cost
   * @param {Number} options.module_id
   * @param {Number} id
   */

   export const updateDiscipline = (options, id) =>{
       return new Promise((resolve, reject)=>{
           axios.put(types.END_POINT+'/discipline/update/'+id, options, types.config)
           .then((message)=>{
               resolve(message.data.message)
           })
           .catch((err)=>{
               reject(err)
           })
       })
   }