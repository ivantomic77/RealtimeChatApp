<script>
    import { page } from '$app/stores';
    import { getFirestore, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
    import { onMount } from 'svelte';

    const pageId = $page.params.id;
    let messageText = '';
    let messages = [];

    const db = getFirestore();

    const messageCollection = collection(db, 'messages'); // Assuming 'messages' is your collection name

    function sendMessage() {
        addDoc(messageCollection, { text: messageText, channel: pageId });
        messageText = '';
    }

    const messageQuery = query(messageCollection, where('channel', '==', pageId));

    onMount(() => {
        const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
            messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
        });

        return unsubscribe;
    });
</script>

<h2>
    Chat: {pageId}
</h2>

{#each messages as message}
    <p>{message.text}</p>
{/each}

<form>
    <input type="text" bind:value={messageText} />
    <button on:click={sendMessage}>Send</button>
</form>
