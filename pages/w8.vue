<template>
  <section class="hero">
    <div class="hero-body">
      <p class="title">
        W8 Bar
      </p>
      <p class="total-songs">{{ totalSongs }} músicas no catálogo</p>
      <div class="pager-box" v-if="!activeFilter">
        <p class="subtitle">
            <span v-if="page > 0" @click="previousPage"><b-icon icon="skip-previous" /></span>
            Página {{pageNumber}}/{{lastPage + 1}}
            <span v-if="page < lastPage" @click="nextPage"><b-icon icon="skip-next" /></span>
            <input class="pager" type="range" min="0" :max="lastPage" v-model.number="page" @change="goToPage"/>
        </p>
      </div>
      <div class="filter-box">
        <span v-if="!activeFilter" style="width:100%">Ou busque por: </span>
        <b-field>
            <b-radio-button v-model="activeFilter" native-value="song"
            type="is-outlined is-primary">
                <b-icon icon="music"></b-icon>
                <span>Música</span>
            </b-radio-button>
            <b-radio-button v-model="activeFilter" native-value="artist"
            type="is-outlined is-primary">
                <b-icon icon="account-music"></b-icon>
                <span>Artista</span>
            </b-radio-button>
            <b-radio-button v-model="activeFilter" native-value="code"
            type="is-outlined is-primary">
                <b-icon icon="numeric"></b-icon>
                <span>Código</span>
            </b-radio-button>
            <b-button v-if="activeFilter" @click="closeSearch">
                <b-icon icon="filter-off"></b-icon>
                <span>Fechar busca</span>
            </b-button>
        </b-field>
        <b-field v-if="activeFilter">
            <b-input placeholder="Buscar..." style="width:100%"
                     ref="theSearchInput"
                     type="search"
                     icon="magnify"
                     icon-clickable
                     v-model="searchInput"
            />
        </b-field>
      </div>
      <div class="container table-container">
        <table>
            <tr v-for="(song, index) in pageContent" :key="index">
                <td>{{ song[1] }}</td>
                <td>{{ song[0] }}</td>
                <td>{{ song[2] }}</td>
                <td>{{ song[3] }}</td>
                <td>{{ song[4] }}</td>
            </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'
import catalog from '~/assets/catalogs/w8.json'

function getCatalogSlice(start, end) {
    return catalog.slice(start, end)
}

function filterCatalogByIndex(query, index) {
    const queryRegEx = new RegExp(query, "i")
    return catalog.filter((song) => song[index].search(queryRegEx) > -1)
}

function getCatalogCount() {
    return catalog.length
}

export default {
  name: 'IndexPage',
  computed: {
    pageNumber() {
        return this.page + 1
    },
    songRange() {
        const start = this.page * this.songsPerPage
        const end = start + this.songsPerPage
        return [start, end]
    },
    searchInput: {
        get() {
            return this.debouncedSearchInput
        },
        set(val) {
            if (this.searchInputTimeout) {
                clearTimeout(this.searchInputTimeout)
            }
            this.searchInputTimeout = setTimeout(() => {
                this.debouncedSearchInput = val
                const filterIndex = {
                    'artist' : 0,
                    'song' : 2,
                    'code' : 1
                }
                if (filterIndex.hasOwnProperty(this.activeFilter) && val.length > 1) {
                    this.pageContent = filterCatalogByIndex(val, filterIndex[this.activeFilter])
                }
            }, 150)
        }
    }
  },
  watch: {
    activeFilter(current) {
        if (current != '') {
            this.$nextTick(() => {
                this.$refs.theSearchInput.focus()
            })
        }
    }
  },
  methods: {
    closeSearch() {
        this.activeFilter = ''
        this.searchInput = ''
        this.updatePage()
    },
    updatePage() {
        this.pageContent = getCatalogSlice(...this.songRange)
    },
    goToPage() {
        this.updatePage()
    },
    nextPage() {
        this.page = this.page + 1
        if (this.page > this.lastPage) {
            this.page = this.lastPage
        }
        this.updatePage()
    },
    previousPage() {
        this.page = this.page - 1
        if (this.page < 0) {
            this.page = 0
        }
        this.updatePage()
    }
  },
  created() {
    console.log(...this.songRange)
    this.pageContent = catalog.slice(...this.songRange)
    this.lastPage = Math.floor(catalog.length / this.songsPerPage)
    this.totalSongs = getCatalogCount()
  },
  data() {
    return {
        page: 0,
        lastPage: 0,
        songsPerPage: 25,
        totalSongs: 0,
        pageContent: [],
        activeFilter: '',
        searchInputTimeout: null
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>
td {
    padding-left: 2vh;
}

table {
    width: 100%;
}

.pager{
    width: 100%;
}

.pager-box {
    margin-bottom: .5rem;
}

.filter-box {
    margin-bottom: 1rem;
}

.total-songs {
    font-size: small;
    color: gray;
    margin-bottom: 2vh;
}

.title {
    margin-bottom: 0;
}

.table-container {
    overflow-y:scroll;
    max-height:64vmin;
}
</style>