import axios from 'axios'
import * as types from '../../Constants/index'
/**
 * GET INSTANCE
 * @returns Array
 */
export const getInstance = () => {
    return new Promise((resolve, reject) => {
        axios.get(types.END_POINT + '/instance/show/all')
            .then((instance) => {
                resolve(instance.data)
            })
            .catch((err) => {
                reject(err)
            })
    })


}

/**
 * GET INSTANCE BY ID
 * @param {number} id
 * @returns Object 
 */

export const getInstanceById = (id) =>{
    return new Promise((resolve, reject)=>{
        axios.get(types.END_POINT+'/instance/show/'+id, types.config)
        .then((instance)=>{
            resolve(instance.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
/**
 * POST INSTANCE
 * @param {object} options
 * @param {string} options.name
 * @param {string} options.city
 * @param {string} options.address
 * @param {boolean} options.responsable
 * @param {number} options.phone_number 
 * @return Promise
 */
export const addInstance = options => {
    return new Promise((resolve, reject) => {
        if (options.name && options.city && options.address && options.responsable && options.phone_number) {
            options.api_key = types.API_KEY_INSTANCE
            axios.post(types.END_POINT + '/instance/add', options, types.config)
                .then((message) => {
                    resolve(message.data.message)
                })
                .catch((err) => {
                    reject(err)
                })
        } else {
            const error = new Error('Vos paramètres ne sont pas complet.')
            reject(error)
        }
    })
}

/**
 * PUT INSTANCE
 * @param {object} options
 * @param {string} options.name
 * @param {string} options.city
 * @param {string} options.address
 * @param {string} options.responsable
 * @param {number} options.phone_number 
 * @param {number} id 
 * @return Promise
 */
export const editInstance = (options, id) => {
    return new Promise((resolve, reject) => {
        if (options.name && options.city && options.address && options.responsable && options.phone_number) {
            options.api_key = types.API_KEY_INSTANCE
            axios.put(types.END_POINT + '/instance/update/' + id, options, types.config)
                .then((message) => {
                    resolve(message.data.message)
                })
                .catch((err) => {
                    reject(err)
                })
        } else {
            const error = new Error('Vos paramètres ne sont pas complet.')
            reject(error)
        }
    })
}
