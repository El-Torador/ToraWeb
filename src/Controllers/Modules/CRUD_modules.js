import axios from 'axios'
import * as types from '../../Constants/index'

/**
 * GET MODULES
 * @returns Array
 */

 export const getModules = () =>{
     return new Promise((resolve, reject)=>{
         axios.get(types.END_POINT+'/module/show/all')
         .then((modules)=>{
             resolve(modules.data)
         })
         .catch((err)=>{
             reject(err)
         })
     })
 }

 /**
  * GET MODULE BY ID
  * @param {Number} id
  * @returns Object
  */

  export const getModuleById = id =>{
      return new Promise((resolve, reject)=>{
          axios.get(types.END_POINT+'/module/show/'+id)
          .then((module)=>{
              resolve(module.data)
          })
          .catch((err)=>{
              reject(err)
          })
      })
  }

  /**
   * ADD MODULE
   * @param {String} options.name
   * @param {String} options.description
   */
  export const addModule = options =>{
    return new Promise((resolve, reject)=>{
        axios.post(types.END_POINT+'/module/add', options)
        .then((message)=>{
            resolve(message.data.message)
        })
        .catch((err)=>{
            reject(err)
    })
    })
  }

  /**
   * UPDATE MODULE
   * @param {String} options.name
   * @param {String} options.description
   */

   export const updateModule = (options, id) =>{
        return new Promise((resolve, reject)=>{
            axios.put(types.END_POINT+'/module/update/'+id, options)
            .then((message)=>{
                resolve(message.data.message)
            })
            .catch((err)=>{
                reject(err)
            })
        })
   }