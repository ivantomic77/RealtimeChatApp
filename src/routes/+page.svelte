{#if $user}
<main class="flex justify-center flex-col items-center gap-2 h-[90vh]">
    <h1 class="text-3xl font-semibold mb-3">Welcome to chatapp</h1>
    <h2>Enter or create a new chat:</h2>
    <form on:submit|preventDefault={navigateToChat}>
        <input type="text" class="px-2 py-1 border-2 rounded-xl border-blue-950 text-blue-950" bind:value={chatId} required>
        <button class="px-2 border-2 rounded-xl border-blue-950 text-blue-950 font-semibold" on:click={navigateToChat}>Go</button>
    </form>
</main>
{:else}
<ForbiddenPage />
{/if}

<script>
    import { goto } from '$app/navigation';
    import { user } from "../Firebase"
    import ForbiddenPage from '../components/ForbiddenPage.svelte';


    let chatId = '';

    function navigateToChat() {
        if (chatId.trim() === '') {
            console.error('Chat ID cannot be empty.');
        } else {
            goto(`/chat/${chatId}`);
        }
    }
</script>
