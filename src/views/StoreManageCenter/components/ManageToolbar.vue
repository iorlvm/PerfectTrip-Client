<template>
    <el-header>
        <ul class="toolbar">
            <slot>
            </slot>
            <li class="grow"></li>
            <li>
                <el-icon>
                    <Search />
                </el-icon>
            </li>
            <li>
                <el-icon>
                    <ChatDotRound />
                </el-icon>
            </li>
            <li>
                <el-icon>
                    <Bell />
                </el-icon>
            </li>
            <li>
                <el-dropdown>
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>View</el-dropdown-item>
                            <el-dropdown-item>Add</el-dropdown-item>
                            <el-dropdown-item>Delete</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span>帳號</span>
            </li>
        </ul>
    </el-header>
</template>

<script setup>

</script>

<style lang="scss">
.el-header {

    position: relative;
    background-color: #fff;
    border-bottom: 2px solid #00000011;
}

.toolbar {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
        display: flex;
        align-items: center;
        font-size: 1.15em;
        margin: 0 5px;

        .el-icon {
            font-size: 1.3em;
            margin: 0 5px;
        }

        span {
            font-size: 0.9em;
        }
    }

    .grow {
        flex-grow: 1;
    }
}
</style>