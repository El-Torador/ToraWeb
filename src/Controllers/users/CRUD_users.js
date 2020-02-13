import axios from 'axios'
import * as types from '../../Constants/index'
/**
 * GET Users
 * @returns Array
 */
export const getUsers = ()=>{
   return new Promise((resolve, reject)=>{
        axios.get(types.END_POINT + '/users/show/all', types.config)
        .then((users) => {
            
           resolve(users.data)
        })
        .catch((err) => {
            console.error(err)
            reject(err)
        }) 
   })
        
        
}
/**
 * POST USER
 * @param {object} options
 * @param {string} options.username
 * @param {string} options.password
 * @param {string} options.roles
 * @param {boolean} options.is_lock
 * @param {number} options.instance_id 
 * @return Promise
 */
export const addUser = options =>{
    return new Promise((resolve, reject)=>{
        if (options.username && options.password && options.roles && options.is_lock && options.instance_id) {
            const payload = {}
            payload.username = options.username
            payload.password = options.password
            payload.roles = options.roles
            payload.is_lock = options.is_lock
            payload.instance_id = Number(options.instance_id)
            payload.api_key = types.API_KEY_USERS
            console.log(payload)
            axios.post(types.END_POINT+'/users/add', payload, types.config)
            .then((message)=>{
                resolve(message.data)
            })
            .catch((err)=>{
                reject(err)
            })
        }else{
            const error = new Error('Vos paramètres ne sont pas complet.')
            reject(error)
        }
    })
}

/**
 * PUT USER
 * @param {object} options
 * @param {string} options.username
 * @param {string} options.password
 * @param {string} options.roles
 * @param {boolean} options.is_lock
 * @param {number} options.instance_id 
 * @param {number} id 
 * @return Promise
 */
export const editUser = (options, id) =>{
     return new Promise((resolve, reject)=>{
         if (options.username && options.password && options.roles && options.is_lock && options.instance_id) {
            const payload = {}
            payload.username = options.username
            payload.password = options.password
            payload.roles = options.roles
            payload.is_lock = options.is_lock
            payload.instance_id = Number(options.instance_id)
            payload.api_key = types.API_KEY_USERS
            console.log(id)
            axios.put(types.END_POINT+'/users/update/'+Number(id), payload)
            .then((message)=>{
                resolve(message.data)
            })
            .catch((err)=>{
                reject(err)
            })
        }else{
             const error = new Error('Vos paramètres ne sont pas complet.')
             reject(error)
        }
    })
}

/**
 * LOCK USER
 * @param {number} id
 * @return Promise
 */
export const deleteUser = id =>{
    return new Promise((resolve, reject)=>{
        axios.delete(types.END_POINT+'/users/delete/'+id, {api_key: types.API_KEY_USERS}, types.config)
        .then((message)=>{
            resolve(message.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}