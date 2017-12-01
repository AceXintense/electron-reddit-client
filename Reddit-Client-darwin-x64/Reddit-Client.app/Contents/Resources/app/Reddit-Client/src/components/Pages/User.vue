<template>

    <div>
        {{$route.params.username}}
        <h1>Posts</h1>
        <div class="posts">
            <div class="post" v-for="post in user.children">
                {{ post }}
            </div>
        </div>
    </div>

</template>

<script>

    export default {

        data() {
            return {
                'user': []
            }
        },
        created() {
            // https://www.reddit.com/user/AceXintense_Reloaded.json
            axios.get('https://www.reddit.com/user/AceXintense_Reloaded.json').then(
                (response) => {
                    console.log(response.data);
                    this.user = response.data;
                }
            );
        }

    }

</script>