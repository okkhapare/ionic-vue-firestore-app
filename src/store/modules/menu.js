import {
    breakfastMenuCollection,
    lunchMenuCollection,
    dinnerMenuCollection,
    miscellaneousMenuCollection
} from '../../firebase'

export const menu = {
    state: {
        breakfastMenu: [],
        lunchMenu: [],
        dinnerMenu: [],
        miscellaneousMenu: []
    },
    mutations: {
        // breakfast
        'ADD_BREAKFAST_MENU': (state, breakfastMenuItem) => {
            var menuItemObject = { id: breakfastMenuItem.breakfastMenuItemId, ...breakfastMenuItem.breakfastMenuItemData }
            state.breakfastMenu.unshift(menuItemObject)
        },
        'UPDATE_BREAKFAST_MENU': (state, menuItem) => {
            state.breakfastMenu.forEach((element) => {
                if (element.id == menuItem.id) {
                    element.name = menuItem.name
                    element.price = menuItem.price
                    element.description = menuItem.description
                }
            })
        },
        'DELETE_BREAKFAST_MENU': (state, menuId) => {
            var objectId = state.breakfastMenu.findIndex(element => element.id === menuId)
            state.breakfastMenu.splice(objectId, 1)
        },
        // lunch
        'ADD_LUNCH_MENU': (state, lunchMenuItem) => {
            var menuItemObject = { id: lunchMenuItem.lunchMenuItemId, ...lunchMenuItem.lunchMenuItemData }
            state.lunchMenu.unshift(menuItemObject)
        },
        'UPDATE_LUNCH_MENU': (state, menuItem) => {
            state.lunchMenu.forEach((element) => {
                if (element.id == menuItem.id) {
                    element.name = menuItem.name
                    element.price = menuItem.price
                    element.description = menuItem.description
                }
            })
        },
        'DELETE_LUNCH_MENU': (state, menuId) => {
            var objectId = state.lunchMenu.findIndex(element => element.id === menuId)
            state.lunchMenu.splice(objectId, 1)
        },
        // dinner
        'ADD_DINNER_MENU': (state, dinnerMenuItem) => {
            var menuItemObject = { id: dinnerMenuItem.dinnerMenuItemId, ...dinnerMenuItem.dinnerMenuItemData }
            state.dinnerMenu.unshift(menuItemObject)
        },
        'UPDATE_DINNER_MENU': (state, menuItem) => {
            state.dinnerMenu.forEach((element) => {
                if (element.id == menuItem.id) {
                    element.name = menuItem.name
                    element.price = menuItem.price
                    element.description = menuItem.description
                }
            })
        },
        'DELETE_DINNER_MENU': (state, menuId) => {
            var objectId = state.dinnerMenu.findIndex(element => element.id === menuId)
            state.dinnerMenu.splice(objectId, 1)
        },
        // miscellaneous
        'ADD_MISCELLANEOUS_MENU': (state, miscellaneousMenuItem) => {
            var menuItemObject = { id: miscellaneousMenuItem.miscellaneousMenuItemId, ...miscellaneousMenuItem.miscellaneousMenuItemData }
            state.miscellaneousMenu.unshift(menuItemObject)
        },
        'UPDATE_MISCELLANEOUS_MENU': (state, menuItem) => {
            state.miscellaneousMenu.forEach((element) => {
                if (element.id == menuItem.id) {
                    element.name = menuItem.name
                    element.price = menuItem.price
                    element.quantity - menuItem.quantity
                    element.description = menuItem.description
                }
            })
        },
        'DELETE_MISCELLANEOUS_MENU': (state, menuId) => {
            var objectId = state.miscellaneousMenu.findIndex(element => element.id === menuId)
            state.miscellaneousMenu.splice(objectId, 1)
        },
    },
    actions: {
        // add

        async addBreakfastMenu({ commit }, breakfastMenuItemData) {
            await breakfastMenuCollection.add({
                name: breakfastMenuItemData.name,
                price: breakfastMenuItemData.price,
                description: breakfastMenuItemData.description
            }).then((docRef) => {
                var breakfastMenuItemId = docRef.id
                commit('ADD_BREAKFAST_MENU', { breakfastMenuItemId, breakfastMenuItemData })
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });

        },
        async addLunchMenu({ commit }, lunchMenuItemData) {
            await lunchMenuCollection.add({
                name: lunchMenuItemData.name,
                price: lunchMenuItemData.price,
                description: lunchMenuItemData.description
            }).then((docRef) => {
                var lunchMenuItemId = docRef.id
                commit('ADD_LUNCH_MENU', { lunchMenuItemId, lunchMenuItemData })
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        },
        async addDinnerMenu({ commit }, dinnerMenuItemData) {
            await dinnerMenuCollection.add({
                name: dinnerMenuItemData.name,
                price: dinnerMenuItemData.price,
                description: dinnerMenuItemData.description
            }).then((docRef) => {
                var dinnerMenuItemId = docRef.id
                commit('ADD_DINNER_MENU', { dinnerMenuItemId, dinnerMenuItemData })
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        },
        async addMiscellaneousMenu({ commit }, miscellaneousMenuItemData) {
            await miscellaneousMenuCollection.add({
                name: miscellaneousMenuItemData.name,
                price: miscellaneousMenuItemData.price,
                description: miscellaneousMenuItemData.description
            }).then((docRef) => {
                var miscellaneousMenuItemId = docRef.id
                commit('ADD_MISCELLANEOUS_MENU', { miscellaneousMenuItemId, miscellaneousMenuItemData })
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        },

        // fetch

        async fetchBreakfastMenu({ commit, state }) {
            state.breakfastMenu = []
            await breakfastMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var breakfastMenuItemId = doc.id
                    var breakfastMenuItemData = doc.data()
                    commit('ADD_BREAKFAST_MENU', { breakfastMenuItemId, breakfastMenuItemData })
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        async fetchLunchMenu({ commit, state }) {
            state.lunchMenu = []
            await lunchMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var lunchMenuItemId = doc.id
                    var lunchMenuItemData = doc.data()
                    commit('ADD_LUNCH_MENU', { lunchMenuItemId, lunchMenuItemData })
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        async fetchDinnerMenu({ commit, state }) {
            state.dinnerMenu = []
            await dinnerMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var dinnerMenuItemId = doc.id
                    var dinnerMenuItemData = doc.data()
                    commit('ADD_DINNER_MENU', { dinnerMenuItemId, dinnerMenuItemData })
                })
            }).catch((err) => {
                console.log(err)
            })
        },
        async fetchMiscellaneousMenu({ commit, state }) {
            state.miscellaneousMenu = []
            await miscellaneousMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    var miscellaneousMenuItemId = doc.id
                    var miscellaneousMenuItemData = doc.data()
                    commit('ADD_MISCELLANEOUS_MENU', { miscellaneousMenuItemId, miscellaneousMenuItemData })
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

