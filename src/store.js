import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { customerCollection } from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        customers: []
    },
    mutations: {
        'ADD_CUSTOMER': (state, customerDetails) => {
            var customerObject = { id: customerDetails.customerId, ...customerDetails.customerData }
            state.customers.unshift(customerObject)
        },
        'UPDATE_CUSTOMER': (state, customerDetails) => {
            state.customers.forEach((customer) => {
                if (customer.id == customerDetails.id) {
                    customer.name = customerDetails.name,
                        customer.mobile = customerDetails.mobile,
                        customer.company = customerDetails.company,
                        customer.amt_due = customerDetails.amt_due,
                        customer.note = customerDetails.note
                }
            })
        },
        'DELETE_CUSTOMER': (state, customerId) => {
            var customerIndex = state.customers.findIndex((element) => element.id == customerId)
            state.customers.splice(customerIndex, 1)
        }
    },
    actions: {
        async fetchCustomerList({ commit, state }) {
            state.customers = []
            await customerCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var customerId = doc.id
                    var customerData = doc.data()
                    commit('ADD_CUSTOMER', { customerId, customerData })
                })
            })
        },
        async addCustomer({ commit }, customerData) {
            await customerCollection.add({
                name: customerData.name,
                mobile: +customerData.mobile,
                company: customerData.company,
                amt_due: +customerData.amt_due,
                note: customerData.note,
                accountTS: firebase.firestore.Timestamp.now()
            }).then((doc) => {
                var customerId = doc.id
                commit('ADD_CUSTOMER', { customerId, customerData })
            })
        },
        async updateCustomer({ commit }, customerDetails) {
            customerCollection.doc(customerDetails.id).update({
                name: customerDetails.name,
                mobile: +customerDetails.mobile,
                company: customerDetails.company,
                amt_due: +customerDetails.amt_due,
                note: customerDetails.note
            });
            commit('UPDATE_CUSTOMER', customerDetails)
        },
        async deleteCustomer({ commit }, customerId) {
            await customerCollection.doc(customerId).delete()
            commit('DELETE_CUSTOMER', customerId)
        }
    },
    getters: {
        getCustomerList: (state) => {
            return state.customers
        }
    }
})