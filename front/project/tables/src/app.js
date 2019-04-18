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
            return this.data.map((item, i) => ({
                index: i,
                ...item
            }));
        }
    },
    mounted() {
        this.getFields(this.tables[this.tab]);
    },
    methods: {
        onTab(item, index) {
            this.tab = index;
            this.getFields(item);
        },
        getFields(item) {
            if (item.table) {
                this.fields = Object.keys(item.table).map( d => ({
                    key: d,
                    text: item.table[d]
                }))
            }
        }
    }
}
