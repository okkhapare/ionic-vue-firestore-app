import { 
    customerCollection, orderCollection, 
    // orderCollection 
} from '../../firebase'
import firebase from 'firebase'

export const account = {
    state: {
        customer: [],
        // order: []
    },
    mutations: {
        // 'SET_CUSTOMER': (state, customerDetails) => {
        //     var customerObject = { id: customerDetails.custId, ...customerDetails.custData }
        //     state.customer.unshift(customerObject)
        // },
        // 'SET_ORDER': (state, order) => {
        //     var orderObject = { id: order.orderId, ...order.orderData }
        //     state.order.unshift(orderObject)
        // },
        'ADD_CUSTOMER': (state, customerDetails) => {
            var customerObject = { id: customerDetails.custId, ...customerDetails.customer }
            state.customer.unshift(customerObject)
        },
        'UPDATE_CUSTOMER': (state, customerDetails) => {
            state.customer.forEach((customer) => {
                if (customer.id == customerDetails.id) {
                    customer.name = customerDetails.name,
                    customer.mobile = customerDetails.mobile,
                    customer.company = customerDetails.company,
                    customer.note = customerDetails.note
                }
            })
        },
        'DELETE_ACCOUNT': (state, customerId) => {
            var objectId = state.customer.findIndex(element => element.id === customerId)
            state.customer.splice(objectId, 1)
        }
    },
    actions: {
        // async fetchCustomerList({ commit, state }) {
        //     state.customer = []
        //     await customerCollection.get().then((res) => {
        //         res.docs.forEach((doc) => {
        //             var custId = doc.id
        //             var custData = doc.data()
        //             commit('SET_CUSTOMER', { custId, custData })
        //         })
        //     })
        // },
        // async fetchOrderList({ commit, state }) {
        //     state.order = []
        //     await orderCollection.get().then((res) => {
        //         res.docs.forEach((doc) => {
        //             var orderId = doc.id
        //             var orderData = doc.data()
        //             commit('SET_ORDER', { orderId, orderData })
        //         })
        //     })
        // },
        async addAccount({ commit }, customer) {
            await customerCollection.add({
                name: customer.name,
                mobile: customer.mobile,
                company: customer.company,
                note: customer.note,
                accountTS: firebase.firestore.Timestamp.now()
            }).then((docRef) => {
                var custId = docRef.id
            commit('ADD_CUSTOMER', { custId, customer })
            })
        },
        async updateAccount({ commit }, customer) {
            await customerCollection.doc(customer.id).update({
                name: customer.name,
                mobile: customer.mobile,
                company: customer.company,
                note: customer.note
            })
            commit('UPDATE_CUSTOMER', customer)
        },
        async deleteAccount({ commit }, customerId) {
            customerCollection.doc(customerId).delete()
            orderCollection.get().then((res) => {
                res.docs.forEach((order) => {
                    if (order.custId == customerId) {
                        order.delete()
                    }
                })
            })
            commit('DELETE_ACCOUNT', customerId)
        }
    },
    getters: {
        // getCustomerList: (state) => {
        //     return state.customer
        // },
        // getOrderList: (state) => {
        //     return state.order
        // }
    }
}