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
            state.breakfastMenu.unshift(breakfastMenu)
        },
        'RESET_BREAKFAST_MENU': (state) => {
            state.breakfastMenu = []
        },
        'SET_LUNCH_MENU': (state, lunchMenu) => {
            state.lunchMenu.unshift(lunchMenu)
        },
        'RESET_LUNCH_MENU': (state) => {
            state.lunchMenu = []
        },
        'SET_DINNER_MENU': (state, dinnerMenu) => {
            state.dinnerMenu.unshift(dinnerMenu)
        },
        'RESET_DINNER_MENU': (state) => {
            state.dinnerMenu = []
        },
        'SET_MISCELLANEOUS_MENU': (state, miscellaneousMenu) => {
            state.miscellaneousMenu.unshift(miscellaneousMenu)
        },
        'RESET_MISCELLANEOUS_MENU': (state) => {
            state.miscellaneousMenu = []
        }
    },
    actions: {
        fetchBreakfastMenu: ({ commit }) => {
            commit('RESET_BREAKFAST_MENU')
            breakfastMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    commit('SET_BREAKFAST_MENU', doc.data())
                })          
            }).catch((err) => {
                console.log(err)
            })
        },
        fetchLunchMenu: ({ commit }) => {
            commit('RESET_LUNCH_MENU')
            lunchMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    commit('SET_LUNCH_MENU', doc.data())
                })          
            }).catch((err) => {
                console.log(err)
            })
        },
        fetchDinnerMenu: ({ commit }) => {
            commit('RESET_DINNER_MENU')
            dinnerMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    commit('SET_DINNER_MENU', doc.data())
                })          
            }).catch((err) => {
                console.log(err)
            })
        },
        fetchMiscellaneousMenu: ({ commit }) => {
            commit('RESET_MISCELLANEOUS_MENU')
            miscellaneousMenuCollection.get().then((res) => {
                res.docs.forEach((doc) => {
                    commit('SET_MISCELLANEOUS_MENU', doc.data())
                })          
            }).catch((err) => {
                console.log(err)
            })
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

