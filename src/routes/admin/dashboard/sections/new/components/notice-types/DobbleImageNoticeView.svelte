<script>
  import { noticeFormState } from "$lib/states/noticeFormState.svelte";

  let { title, content, postdata, imageURL } = $props();
</script>

<div class="flex flex-col items-center gap-2 min-w-150 max-w-200 min-h-50 border-4 rounded-xl">
  <p class="font-bold text-2xl uppercase mx-4 mt-2">{title}</p>
  <div class="flex flex-1 flex-row gap-4 my-4 px-4">
    {#if noticeFormState.designType == 'I'}
      <p class="text-lg mx-4 flex-1">{content}</p>
    {/if}
    {#if imageURL != null}
      <img src={imageURL} alt="Imagen del aviso" class="h-40 w-40 flex text-sm items-center justify-center border rounded-md object-cover"/>
    {/if}
    {#if noticeFormState.designType == 'D'}
      <p class="text-lg mx-4 flex-1">{content}</p>
    {/if}
  </div>
  <p class="bg-black text-white text-md w-full rounded-md text-center">{postdata}</p>
</div>
