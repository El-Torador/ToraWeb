import axios from 'axios'
import * as types from '../../Constants/index'


/**
 * GET LEARNER
 * @returns Array
 */
export const getLearner = () => {
    return new Promise((resolve, reject) => {
        axios.get(types.END_POINT + '/learner/show/all')
            .then((learner) => {
                resolve(learner.data)
            })
            .catch((err) => {
                //console.error(err)
                reject(err)
            })
    })


}

/**
 * GET LEARNER BY ID
 * @param {number} id
 * @returns Object 
 */

export const getLearnerById = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(types.END_POINT + '/learner/show/' + id, types.config)
            .then((instance) => {
                resolve(instance.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
/**
 * POST LEARNER
 * @param {object} options
 * @param {string} options.first_name
 * @param {string} options.last_name
 * @param {string} options.birth_date
 * @param {string} options.marital_status
 * @param {string} options.sex
 * @param {string} options.jobs
 * @param {string} options.address
 * @param {string} options.email
 * @param {number} options.instance_id
 * @param {string} options.avatar
 * @param {number} options.phone_number 
 * @return Promise
 */
export const addLearner = options => {
    return new Promise((resolve, reject) => {
        if (options.first_name && options.last_name && options.birth_date && options.marital_status && options.sex && options.jobs && options.address && options.email && options.instance_id && options.avatar && options.phone_number) {
            options.api_key = types.API_KEY_LEARNER
            axios.post(types.END_POINT + '/learner/add', options, types.config)
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
 * PUT LEARNER
 * @param {object} options
 * @param {string} options.first_name
 * @param {string} options.last_name
 * @param {string} options.birth_date
 * @param {string} options.marital_status
 * @param {string} options.sex
 * @param {string} options.jobs
 * @param {string} options.address
 * @param {string} options.email
 * @param {number} options.instance_id
 * @param {string} options.avatar
 * @param {number} options.phone_number
 * @param {number} id 
 * @return Promise
 */
export const editLearner = (options, id) => {
    return new Promise((resolve, reject) => {
        if (options.first_name && options.last_name && options.birth_date && options.marital_status && options.sex && options.jobs && options.address && options.email && options.instance_id && options.avatar && options.phone_number) {
            options.api_key = types.API_KEY_INSTANCE
            axios.put(types.END_POINT + '/learner/update/' + id, options, types.config)
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