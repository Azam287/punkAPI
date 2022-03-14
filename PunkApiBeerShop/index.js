Vue.component('v-pagination', window['vue-plain-pagination'])

const app = new Vue({
    el:'#app1',
    data:{
        page:1,
        perPage: 5,
        // baseUrl:'https://api.punkapi.com/v2/beers?page=1&per_page=5',
        baseUrl:'https://api.punkapi.com/v2/beers?',
        totalItems: 0,
        totalPages: 65,
        lastPage: 65,
        result: '',
        searchItem:'',
        searchTotalItem:'',
        data: [],
        itemAbvCheck:'',
        itemIbuCheck:'',
        currentPage: 1,
        total: 9,
        bootstrapPaginationClasses: {
            ul: 'pagination',
            li: 'page-item',
            liActive: 'active',
            liDisable: 'disabled',
            button: 'page-link'
        },
        paginationAnchorTexts: {
            first: 'First',
            prev: 'Previous',
            next: 'Next',
            last: 'Last'
        },
        activePagination: true,
        nextBtnActive: true,
        hideAbvActive: true,
        hideIbuActive: true,
        searchActive : false,
        clearBtnActive: false,
        crossAbvBtnActive: false,
        crossIbuBtnActive: false,
        noResultPageActive: false,
        errorPageActive: false,
    },
    methods:{
        // fetchBeerData: function () {
        //     let newSearchItem=''
        //     if(this.searchItem!=''){
        //         newSearchItem = `beer_name=${this.searchItem}&`
        //         this.searchActive = true;
        //         // this.currentPage=1;
        //         this.paginationActive();
        //     }
        //
        //     fetch(this.baseUrl+`${newSearchItem}page=${this.page}&per_page=${this.perPage}${this.itemAbvCheck}${this.itemIbuCheck}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             this.result=data;
        //             if(data.length<this.perPage) this.nextBtnActive = false;
        //             else this.nextBtnActive = true;
        //         })
        // },
        //
        // setPages: function () {
        //     this.totalPages = Math.ceil(this.totalItems / this.perPage);
        //     this.total = this.totalPages;
        // },
        //
        // filterItem: function(){
        //     if(this.searchItem){
        //         this.searchActive = true;
        //         let newSearchItem=''
        //         if(this.searchItem!=''){
        //             newSearchItem = `beer_name=${this.searchItem}`
        //         }
        //         fetch(this.baseUrl+`${newSearchItem}&per_page=${this.perPage}${this.itemAbvCheck}${this.itemIbuCheck}`)
        //             .then(response => response.json())
        //             .then(data=>{
        //                 this.result=data;
        //             })
        //
        //         console.log("searchActive",this.searchActive);
        //         this.paginationActive();
        //     }
        //
        //     if(this.searchItem!=''){
        //         this.searchActive = true;
        //         // this.totalItems = 0;
        //         // this.totalItemCount();
        //         this.currentPage=1;
        //         console.log("searchActive",this.searchActive);
        //         this.paginationActive();
        //     }
        //     else{
        //         // this.totalItems = 0;
        //         // this.totalItemCount();
        //         this.searchActive = false;
        //         this.fetchBeerData();
        //         console.log("searchActive",this.searchActive);
        //         this.paginationActive();
        //
        //     }
        // },

        // fetchBeerData: function () {
        //     let newSearchItem=''
        //     if(this.searchItem!=''){
        //         newSearchItem = `beer_name=${this.searchItem}&`
        //     }
        //
        //     fetch(this.baseUrl+`${newSearchItem}page=${this.page}&per_page=${this.perPage}${this.itemAbvCheck}${this.itemIbuCheck}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             this.result = data;
        //             if(data.length<this.perPage) this.nextBtnActive = false;
        //             else this.nextBtnActive = true;
        //         })
        // },
        fetchBeerData: function () {
            let newSearchItem=''
            if(this.searchItem!==''){
                newSearchItem = `beer_name=${this.searchItem}&`
            }
            //
            // let urlLoad = new URL(window.location.href);
            // urlLoad.searchParams.set('abv',this.itemAbvCheck);
            // let pushingValues =  urlLoad.searchParams.set('ibu',this.itemIbuCheck);
            // console.log(urlLoad);
            // urlLoad.searchParams.delete('param2');
            // window.history.replaceState(null, null,urlLoad);
            // history.pushState(null,null, urlLoad);
            // console.log(urlLoad);

            fetch(this.baseUrl+`${newSearchItem}page=${this.page}&per_page=${this.perPage}${this.itemAbvCheck}${this.itemIbuCheck}`)
                .then(response =>{
                    if (response.ok) {
                        this.errorPageActive = false;
                        return response.json();
                    } else {
                        // console.log(Error);
                        this.errorPageActive = true;
                        return Promise.reject(response);
                    }
                })
                .then(data => {
                    if(data.length!==0){
                        this.result = data;
                        this.noResultPageActive = false;
                    }
                    else {
                        this.noResultPageActive = true;
                    }


                    // Fetch another API
                    return fetch(this.baseUrl+`${newSearchItem}page=${this.page+1}&per_page=${this.perPage}${this.itemAbvCheck}${this.itemIbuCheck}`);

                }).then(response => {
                if (response.ok) {
                    this.errorPageActive = false;
                    return response.json();
                } else {
                    // console.log("error");
                    this.errorPageActive = true;
                    // this.activePagination = false;
                    return Promise.reject(response);
                }
            })
                .then(userData => {
                    //before correction
                    // if(userData.length !== 0) this.nextBtnActive = true;
                    // else this.nextBtnActive = false;
                    //    correction
                    this.nextBtnActive = userData.length !== 0;
                }).catch(function (error) {
                this.errorPageActive = true;
                console.log("errorPageActive",errorPageActive);
                // console.log('Error',error);
                // console.warn(error);
            });
        },

        setPages: function () {
            this.totalPages = Math.ceil(this.totalItems / this.perPage);
            this.total = this.totalPages;
        },
        filterItem: function(){
            if(this.searchItem){
                this.searchActive = true;
                let newSearchItem='';
                if(this.searchItem!==''){
                    this.page = 1;
                    newSearchItem = `beer_name=${this.searchItem}`
                }
                fetch(this.baseUrl+`${newSearchItem}&per_page=${this.perPage}${this.itemAbvCheck}${this.itemIbuCheck}`)
                    .then(response => response.json())
                    .then(data=>{
                        this.result=data;
                    })

                console.log("searchActive",this.searchActive);
                this.paginationActive();
            }

            if(this.searchItem!==''){
                this.searchActive = true;
                // this.totalItems = 0;
                // this.totalItemCount();
                this.currentPage=1;
                console.log("searchActive",this.searchActive);
                this.paginationActive();
            }
            else{
                // this.totalItems = 0;
                // this.totalItemCount();
                this.searchActive = false;
                this.fetchBeerData();
                console.log("searchActive",this.searchActive);
                this.paginationActive();

            }
        },

        // totalItemCount: function(newPageCount=1) {
        //     let newBaseUrl =`https://api.punkapi.com/v2/beers?page=${newPageCount}&per_page=80`;
        //
        //     if(this.searchItem!=''){
        //         newBaseUrl = this.baseUrl+`beer_name=${this.searchItem}&page=${newPageCount}&per_page=80`;
        //     }
        //
        //     // console.log("newBaseUrl",newBaseUrl)
        //     this.data = fetch(newBaseUrl)
        //         .then(response  =>  response.json())
        //         .then(data => {
        //             return data
        //         })
        //
        //     this.data.then((data)=>{
        //         if(data.length){
        //             newPageCount += 1;
        //             this.totalItems = parseInt(this.totalItems)+parseInt(data.length);
        //             this.totalItemCount(newPageCount);
        //
        //         }
        //     })
        //
        // },

        totalItemCount: function(newPageCount=1) {
            let newBaseUrl =`https://api.punkapi.com/v2/beers?page=${newPageCount}&per_page=80`;

            // console.log("newBaseUrl",newBaseUrl)
            this.data = fetch(newBaseUrl)
                .then(response  =>  response.json())
                .then(data => {
                    return data
                })

            this.data.then((data)=>{
                if(data.length){
                    newPageCount += 1;
                    this.totalItems = parseInt(this.totalItems)+parseInt(data.length);
                    this.totalItemCount(newPageCount);

                }
            })
        },
        clearAllFilter: function() {
            this.crossAbvBtnActive = false;
            this.crossIbuBtnActive = false;
            this.clearBtnActive = false;
            this.itemAbvCheck = '';
            this.itemIbuCheck = '';
            if(this.searchItem !== ''){
                this.activePagination = false;
            }
            else{
                this.activePagination = true;
            }
            // this.activePagination = this.searchItem === '';

            this.page = 1;
            this.currentPage = 1;
            // this.paginationActive();
            this.fetchBeerData();
        },
        paginationActive: function(){
            let getSelectedAbvValue = document.querySelector( 'input[name="abv"]:checked');
            // this.crossAbvBtnActive = getSelectedAbvValue ? true : false;
            this.crossAbvBtnActive = !!getSelectedAbvValue;

            let getSelectedIbuValue = document.querySelector( 'input[name="ibu"]:checked');
            // this.crossIbuBtnActive = getSelectedIbuValue ? true : false;
            this.crossIbuBtnActive = !!getSelectedIbuValue;

            // if(getSelectedAbvValue || getSelectedIbuValue) this.clearBtnActive = true;
            // else this.clearBtnActive = false;

            this.clearBtnActive = !!(getSelectedAbvValue || getSelectedIbuValue);

            if(getSelectedAbvValue || getSelectedIbuValue || this.searchActive){
                this.fetchBeerData();
                this.activePagination = false;
            }
            else{
                this.activePagination = true;
                // this.clearAllFilter();
            }
        },
        clearFilterBtn: function (val){
            if(val==='abv'){
                this.itemAbvCheck = '';
                this.crossAbvBtnActive = false;
            }
            else if(val==='ibu'){
                this.itemIbuCheck='';
                this.crossIbuBtnActive = false;
            }

            if(!(this.crossAbvBtnActive) && !(this.crossIbuBtnActive)){
                this.clearBtnActive = false;
                // this.activePagination = this.searchItem!='' ? false : true;
                this.activePagination = this.searchItem === '';
            }

            this.fetchBeerData();
        }
    },
    created() {
        this.totalItemCount();
        this.fetchBeerData();
    },
    watch: {
        perPage () {
            this.currentPage=1;
            this.setPages();
        },
        totalItems (){
            this.setPages();
        },
        currentPage () {
            this.page = this.currentPage;
            this.fetchBeerData()
        }
    }
})



