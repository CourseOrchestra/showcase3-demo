
<template>
    <div>
        <TreeTable :value="nodes" :lazy="true" :paginator="true" :rows="rows" :loading="loading"
                   @nodeExpand="onExpand" @page="onPage" :totalRecords="totalRecords">
            <Column field="name" header="Name" :expander="true"></Column>
            <Column field="size" header="Size"></Column>
            <Column field="type" header="Type"></Column>
        </TreeTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

setTitle("primevuetreetable");

onMounted(() => {
    loading.value = true;

    setTimeout(() => {
        loading.value = false;
        nodes.value = loadNodes(0, rows.value);
        totalRecords.value = 1000;
    }, 1000);
});

const nodes = ref();
const rows = ref(10);
const loading = ref(false);
const totalRecords = ref(0);
const onExpand = (node) => {
    if (!node.children) {
        loading.value = true;

        setTimeout(() => {
            let lazyNode = {...node};

            lazyNode.children = [
                {
                    data: {
                        name: lazyNode.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    },
                },
                {
                    data: {
                        name: lazyNode.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            let newNodes = nodes.value.map(n => {
                if (n.key === node.key) {
                    n = lazyNode;
                }

                return n;
            });

            loading.value = false;
            nodes.value = newNodes;
        }, 250);
    }
};
const onPage = (event) => {
    loading.value = true;

    //imitate delay of a backend call
    setTimeout(() => {
        loading.value = false;
        nodes.value = loadNodes(event.first, rows.value);
    }, 1000);
};
const loadNodes = (first, rows) => {
    let nodes = [];

    for(let i = 0; i < rows; i++) {
        let node = {
            key: (first + i),
            data: {
                name: 'Item ' + (first + i),
                size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                type: 'Type ' + (first + i)
            },
            leaf: false
        };

        nodes.push(node);
    }

    return nodes;
};
</script>
