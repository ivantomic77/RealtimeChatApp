<script>
    export let messageText;
    export let username;
    export let messageTimestamp;
  
    let relativeTime;
  
    function calculateRelativeTime() {
      if(!messageTimestamp) return null;
      const now = new Date();
      const timestamp = messageTimestamp ? messageTimestamp.toDate() : now;
      const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
      if (diffInSeconds < 60) {
        return `now`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d ago`;
      }
    }
  
    $: {
      relativeTime = calculateRelativeTime();
    }
</script>
  
{#if username}
<div class="flex gap-3">
    <h2 class="shrink-0">{username}</h2>
    <h2 class="shrink-0">{relativeTime}</h2>
</div>
{/if}
<h2 class="text inline-block rounded-xl text-white py-2 px-4 max-w-full break-all lg:text-lg text-sm bg-green-800">{messageText}</h2>

  