import tableData from './data.json';

export default {
    data() {
        return {
            data: tableData,
            tab: 0,
            fields: []
        }
    },
    computed: {
        tables() {
            let data = this.data;
            data.sort((a, b) => a.name.localeCompare(b.name) );
            return data.map((item, i) => ({
                index: i,
                ...item
            }));
        }
    },
    mounted() {
        this.getTables(this.tables[this.tab]);
        document.title = '表结构说明';
    },
    methods: {
        onTab(item, index) {
            this.tab = index;
            this.getTables(item);
        },
        getTables(item) {
            if (item.tables) {
                let tables = item.tables;
                tables = tables.map( t => ({
                    name: t.name,
                    fields: Object.keys(t.fields).map( d => ({
                        key: d,
                        text: t.fields[d]
                    }))
                }));
                this.fields = tables;
                console.log(this.fields)
            }
        }
    }
}
