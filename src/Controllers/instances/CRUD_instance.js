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
                //console.error(err)
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
            console.log(err)
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
            axios.post(types.END_POINT + '/instance/add', options, types.config)
                .then((phone) => {
                    resolve(phone)
                })
                .catch((err) => {
                    reject(err)
                })
        } else {
            reject('Vos paramètres ne sont pas complet.')
        }
    })
}

/**
 * PUT phone
 * @param {object} options
 * @param {string} options.name
 * @param {string} options.city
 * @param {string} options.address
 * @param {boolean} options.responsable
 * @param {number} options.phone_number 
 * @param {number} id 
 * @return Promise
 */
export const editInstance = (options, id) => {
    return new Promise((resolve, reject) => {
        if (options.name && options.city && options.address && options.responsable && options.phone_number) {
            axios.put(types.END_POINT + '/phone/' + id, options, types.config)
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        } else {
            reject('Vos paramètres ne sont pas complet.')
        }
    })
}
