<template>
    <span class="tag">
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
.tag {
    background-color: $tagColor;
    padding: 4px 8px;
    margin: 3px 0;
    border-radius: 5px;
    color: $xtxColor;
    font-size: 0.9em;
    letter-spacing: 1px;
}
</style>