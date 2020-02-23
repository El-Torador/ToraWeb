import axios from 'axios'
import * as types from '../../Constants/index'

/**
 * GET FORMER
 * @returns Array
 */
export const getFormers = () =>{
    return new Promise((resolve, reject)=>{
        axios.get(types.END_POINT+'/former/show/all')
        .then((formers)=>{
            resolve(formers.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

/**
 * GET FORMER BY ID
 * @param {number} id
 * @returns object 
 */
export const getFormerById = id =>{
    return new Promise((resolve, reject)=>{
        axios.get(types.END_POINT+'/former/show/'+id)
        .then((former)=>{
            resolve(former.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

/**
 * ADD FORMER
 * @param {object} options
 * @param {string} options.matricule
 * @param {string} options.cnps
 * @param {string} options.first_name
 * @param {string} options.last_name
 * @param {string} options.birth_date
 * @param {string} options.sex
 * @param {string} options.function
 * @param {string} options.email
 * @param {string} options.avatar 
 */
export const addFormer = options =>{
    return new Promise((resolve, reject)=>{
        if(options.matricule && options.cnps && options.first_name && options.last_name && options.birth_date && options.sex && options.function && options.email && options.avatar){
            axios.post(types.END_POINT + '/former/add', options)
                .then((message) => {
                    resolve(message.data.message)
                })
                .catch((err) => {
                    reject(err)
                })
        }else{
            const error = new Error('Vos paramètres ne sont pas complet !')
            reject(error)
        }
    })
}

/**
 * UPDATE FORMER
 * @param {object} options
 * @param {string} options.matricule
 * @param {string} options.cnps
 * @param {string} options.first_name
 * @param {string} options.last_name
 * @param {string} options.birth_date
 * @param {string} options.sex
 * @param {string} options.function
 * @param {string} options.email
 * @param {string} options.avatar
 * @param {number} id
 */
export const updateFormer = (options, id) =>{
    return new Promise((resolve, reject)=>{
        if (options.matricule && options.cnps && options.first_name && options.last_name && options.birth_date && options.sex && options.function && options.email && options.avatar) {
            axios.put(types.END_POINT + '/former/update/'+id, options)
                .then((message) => {
                    resolve(message.data.message)
                })
                .catch((err) => {
                    reject(err)
                })
        } else {
            const error = new Error('Vos paramètres ne sont pas complet !')
            reject(error)
        }
    })
}