<script>
    import { noticeFormState } from "$lib/states/noticeFormState.svelte";

  let { title, content, postdata, imageURL } = $props();
</script>

<div class="flex flex-col items-center gap-2 min-w-150 max-w-200 min-h-50 border-4 rounded-xl">
  <p class="font-bold text-2xl uppercase mx-4 mt-2">{title}</p>
  <div class="m-2 p-2">
    <img src={imageURL} alt="Imagen del aviso" class="h-40 w-40 mb-4 ml-4 mr-4 mt-2 border rounded-md flex justify-center items-center {noticeFormState.designType === 'I' ? 'float-right' : noticeFormState.designType === 'D' ? 'float-left' : ''} "/>
    <p class="text-lg mx-4 flex-1">{content}</p>
  </div>
  <p class="bg-black text-white text-md w-full rounded-md text-center">{postdata}</p>
</div>
