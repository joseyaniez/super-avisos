<script lang="ts">
  import { noticeContent, noticeFormState } from "$lib/states/noticeFormState.svelte";
  import { parseEditorText, type ParsedText } from "$lib/util/parser/parseContents";
    import DobbleNoticeView from "./notice-types/DobbleNoticeView.svelte";
    import MedianNoticeView from "./notice-types/MedianNoticeView.svelte";
  import SimpleNoticeView from "./notice-types/SimpleNoticeView.svelte";

  let noticeContents = $derived(parseEditorText(noticeContent.raw))


</script>
<div class="flex-1 flex flex-col m-2 p-4 rounded-xl bg-slate-200">
  <div class="flex flex-row justify-center gap-2">
    <button>1</button>
    <button>2</button>
    <button>3</button>
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
    {/if}
  </div>
</div>
