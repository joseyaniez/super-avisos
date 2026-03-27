<script lang="ts">
  import { noticeContent, noticeFormState } from "$lib/states/noticeFormState.svelte";
  import { parseEditorText, type ParsedText } from "$lib/util/parser/parseContents";
    import BigNoticeView from "./notice-types/BigNoticeView.svelte";
  import DobbleImageNoticeView from "./notice-types/DobbleImageNoticeView.svelte";
  import DobbleNoticeView from "./notice-types/DobbleNoticeView.svelte";
  import MedianNoticeView from "./notice-types/MedianNoticeView.svelte";
  import SimpleNoticeView from "./notice-types/SimpleNoticeView.svelte";

  let noticeContents = $derived(parseEditorText(noticeContent.raw))

  let designTypes = [
    { id: 1, name: 'A' },
    { id: 1, name: 'B' },
  ]

</script>
<div class="flex-1 flex flex-col m-2 p-4 rounded-xl bg-slate-200">
  <div class="flex flex-row justify-center gap-2">
    {#each designTypes as design}
      <button 
        onclick={() => noticeContent.designType = design.name}
        class="px-2 py-1 rounded-md bg-slate-300 text-sm"
      >
        {design.name}
      </button>
    {/each}
  </div>
  <div class="flex-1 flex items-center justify-center" style="white-space: pre-line;">
    {#if noticeContent.raw == ''}
      Sin vista previa
    {:else if noticeFormState.noticeType === 'Pequeño'}
      <SimpleNoticeView content={noticeContents.textoNormal}/>
    {:else if noticeFormState.noticeType === 'Mediano'}
      <MedianNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
      />
    {:else if noticeFormState.noticeType === 'Doble'}
      <DobbleNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
      />
    {:else if noticeFormState.noticeType === 'Doble con imagen'}
      <DobbleImageNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
        imageURL={noticeContent.imageUrl}
      />
    {:else if noticeFormState.noticeType === 'Grande'}
      <BigNoticeView 
        title={noticeContents.titulo} 
        content={noticeContents.textoNormal} 
        postdata={noticeContents.postdata}
        imageURL={noticeContent.imageUrl}
      />
    {/if}
  </div>
</div>
