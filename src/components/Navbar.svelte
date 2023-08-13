<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    function logout() {
        dispatch('logout')
    }
    function login() {
        dispatch('login')
    }

    export let loggedIn;
</script>

<nav class="flex h-16 justify-between items-center px-20 bg-blue-950 text-white">
    <h2 class="text-xl">
        Realtime chat
    </h2>
    {#if loggedIn}
    <button on:click={logout} class="border-2 py-2 px-4 rounded-xl hover:text-blue-950 hover:bg-white">Logout</button>
    {:else}
    <button on:click={login} class="border-2 py-2 px-4 rounded-xl hover:text-blue-950 hover:bg-white">Login</button>
    {/if}
</nav>