import { 
    breakfastMenuCollection, 
    lunchMenuCollection, 
    dinnerMenuCollection, 
    miscellaneousMenuCollection } from '../../firebase'

export const menu = {
    state: {
        breakfastMenu: [],
        lunchMenu: [],
        dinnerMenu: [],
        miscellaneousMenu: []
    },
    mutations: {
        'SET_BREAKFAST_MENU': (state, breakfastMenu) => {
            var menuItem = { id: breakfastMenu.docId, ...breakfastMenu.docData }
            state.breakfastMenu.unshift(menuItem)
        },
        'UPDATE_BREAKFAST_MENU': (state, menu) => {
            state.breakfastMenu.forEach((element) => {
                if (element.id == menu.id) {
                    element.name = menu.name
                    element.price = menu.price
                    element.description = menu.description
                }
            })
        },
        'DELETE_BREAKFAST_MENU': (state, id) => {
            var objectId = state.breakfastMenu.findIndex(element => element.id === id)
            state.breakfastMenu.splice(objectId, 1)
        },
        'RESET_BREAKFAST_MENU': (state) => {
            state.breakfastMenu = []
        },
        'SET_LUNCH_MENU': (state, lunchMenu) => {
            const menuItem = { id: lunchMenu.docId, ...lunchMenu.docData }
            state.lunchMenu.unshift(menuItem)
        },
        'UPDATE_LUNCH_MENU': (state, menu) => {
            state.lunchMenu.forEach((element) => {
                if (element.id == menu.id) {
                    element.name = menu.name
                    element.price = menu.price
                    element.description = menu.description
                }
            })
        },
        'DELETE_LUNCH_MENU': (state, id) => {
            var objectId = state.lunchMenu.findIndex(element => element.id === id)
            state.lunchMenu.splice(objectId, 1)
        },
        'RESET_LUNCH_MENU': (state) => {
            state.lunchMenu = []
        },
        'SET_DINNER_MENU': (state, dinnerMenu) => {
            const menuItem = { id: dinnerMenu.docId, ...dinnerMenu.docData }
            state.dinnerMenu.unshift(menuItem)
        },
        'UPDATE_DINNER_MENU': (state, menu) => {
            state.dinnerMenu.forEach((element) => {
                if (element.id == menu.id) {
                    element.name = menu.name
                    element.price = menu.price
                    element.description = menu.description
                }
            })
        },
        'DELETE_DINNER_MENU': (state, id) => {
            var objectId = state.dinnerMenu.findIndex(element => element.id === id)
            state.dinnerMenu.splice(objectId, 1)
        },
        'RESET_DINNER_MENU': (state) => {
            state.dinnerMenu = []
        },
        'SET_MISCELLANEOUS_MENU': (state, miscellaneousMenu) => {
            const menuItem = { id: miscellaneousMenu.docId, ...miscellaneousMenu.docData }            
            state.miscellaneousMenu.unshift(menuItem)
        },
        'UPDATE_MISCELLANEOUS_MENU': (state, menu) => {
            state.miscellaneousMenu.forEach((element) => {
                if (element.id == menu.id) {
                    element.name = menu.name
                    element.price = menu.price
                    element.description = menu.description
                }
            })
        },
        'DELETE_MISCELLANEOUS_MENU': (state, id) => {
            var objectId = state.miscellaneousMenu.findIndex(element => element.id === id)
            state.miscellaneousMenu.splice(objectId, 1)
        },
        'RESET_MISCELLANEOUS_MENU': (state) => {
            state.miscellaneousMenu = []
        }
    },
    actions: {
        async fetchBreakfastMenu({ commit }) {
            commit('RESET_BREAKFAST_MENU')
            await breakfastMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var docId = doc.id
                    var docData = doc.data()
                    commit('SET_BREAKFAST_MENU', { docId, docData })
                })          
            }).catch((err) => {
                console.log(err)
            })
        },
        async fetchLunchMenu({ commit }) {
            commit('RESET_LUNCH_MENU')
            await lunchMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var docId = doc.id
                    var docData = doc.data()
                    commit('SET_LUNCH_MENU', { docId, docData })
                })          
            }).catch((err) => {
                console.log(err)
            })
        },
        async fetchDinnerMenu({ commit }) {
            commit('RESET_DINNER_MENU')
            await dinnerMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var docId = doc.id
                    var docData = doc.data()
                    commit('SET_DINNER_MENU', { docId, docData })
                })          
            }).catch((err) => {
                console.log(err)
            })
        },
        async fetchMiscellaneousMenu({ commit }) {
            commit('RESET_MISCELLANEOUS_MENU')
            await miscellaneousMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var docId = doc.id
                    var docData = doc.data()
                    commit('SET_MISCELLANEOUS_MENU', { docId, docData })
                })          
            }).catch((err) => {
                console.log(err)
            })
        },

        // Update Menu

        async updateBreakfastMenu({ commit }, menu) {
            await breakfastMenuCollection.doc(menu.id).update({
                name: menu.name,
                price: menu.price,
                description: menu.description
            })
            commit('UPDATE_BREAKFAST_MENU', menu)
        },
        async updateLunchMenu({ commit }, menu) {
            await lunchMenuCollection.doc(menu.id).update({
                name: menu.name,
                price: menu.price,
                description: menu.description
            })
            commit('UPDATE_LUNCH_MENU', menu)
        },
        async updateDinnerMenu({ commit }, menu) {
            await dinnerMenuCollection.doc(menu.id).update({
                name: menu.name,
                price: menu.price,
                description: menu.description
            })
            commit('UPDATE_DINNER_MENU', menu)
        },
        async updateMiscellaneousMenu({ commit }, menu) {
            await miscellaneousMenuCollection.doc(menu.id).update({
                name: menu.name,
                price: menu.price,
                quantity: menu.quantity,
                description: menu.description
            })
            commit('UPDATE_MISCELLANEOUS_MENU', menu)
        },

        // Delete Menu

        async deleteBreakfastMenu({ commit }, menuId) {
            await breakfastMenuCollection.doc(menuId).delete()
            commit('DELETE_BREAKFAST_MENU', menuId)
        },
        async deleteLunchMenu({ commit }, menuId) {
            await lunchMenuCollection.doc(menuId).delete()
            commit('DELETE_LUNCH_MENU', menuId)
        },
        async deleteDinnerMenu({ commit }, menuId) {
            await dinnerMenuCollection.doc(menuId).delete()
            commit('DELETE_DINNER_MENU', menuId)
        },
        async deleteMiscellaneousMenu({ commit }, menuId) {
            await miscellaneousMenuCollection.doc(menuId).delete()
            commit('DELETE_MISCELLANEOUS_MENU', menuId)
        }

    },
    getters: {
        getBreakfastMenu: (state) => {
            return state.breakfastMenu
        },
        getLunchMenu: (state) => {
            return state.lunchMenu
        },
        getDinnerMenu: (state) => {
            return state.dinnerMenu
        },
        getMiscellaneousMenu: (state) => {
            return state.miscellaneousMenu
        },
    }
}

