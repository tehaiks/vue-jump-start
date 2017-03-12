<template>
    <a :href="path" title="Single File Vue Components">
        <article class="message">
            <div class="message-header">
                <p>{{title}}</p>
            </div>
            <div class="message-body" v-html="content"></div>
        </article>
    </a>
</template>
<script>
export default {
    name: 'custom-component',
    data: function() {
        return {

            path: '../src/components/component.vue',
            title: 'Imported Goodies',
            content: 'This is a single file <strong>.Vue</strong> component'

        }
    },
    mounted: function() {

    },
    methods: {


    }
}
</script>
<style lang="less" scoped>
.message {
    cursor: pointer;
    margin-bottom: 24px;
}
</style>
