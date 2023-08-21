<script>
    import { onMount, afterUpdate } from 'svelte';
    import { messageCollection, onSnapshot, where, orderBy, serverTimestamp, addDoc, query, user } from '../../../Firebase';
    import Message from '../../../components/Message.svelte';
    import ForbiddenPage from '../../../components/ForbiddenPage.svelte';
    import { page } from '$app/stores';

    const pageId = $page.params.id;
    let messageText = '';
    let messages = [];

    onMount(async () => {
        const messageQuery = query(messageCollection, where('channel', '==', pageId), orderBy('createdAt'));

        const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
            messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
        });
        return unsubscribe;
    });

    async function sendMessage(event) {
        event.preventDefault();
        if (!user) {
            console.error("User not available.");
            return;
        }

        try {
            if (!messageText) return;
            await addDoc(messageCollection, { text: messageText, channel: pageId, createdAt: serverTimestamp(), user: $user });
            messageText = '';
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
</script>

{#if $user}
<main class="flex justify-center">
   <div class="md:w-[60vw] w-full pb-20">
       <h2 class="text-center mt-5 text-3xl font-semibold">
               Chat: {pageId}
       </h2>
       <div class="flex flex-col gap-2 items-end">
           {#each messages as message}
           <div class={$user.id !== message.user.id  ? "self-start" : ""}>
               <Message messageText={message.text} username={$user.id !== message.user.id  ? message.user.name : ""} messageTimestamp={$user.id !== message.user.id  ? message.createdAt : ""} />
           </div>
           {/each}
       </div>

       <form class="flex gap-2 fixed bottom-0 grow md:w-[60vw] w-full p-4 bg-blue-950 rounded-t-xl">
           <input type="text" placeholder="Type something..." class="px-2 py-1 border-2 rounded-xl bg-blue-800 text-white border-blue-950 w-full" required bind:value={messageText} />
           <button type="button" on:click={sendMessage} class="bg-blue-800 text-white font-semibold px-2 rounded-xl">Send</button>
       </form>
   </div>  
</main>
{:else}
<ForbiddenPage />
{/if}