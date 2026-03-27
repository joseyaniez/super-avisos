<script>
  let { title, content, postdata } = $props();
</script>

<div class="flex flex-col items-center gap-2 max-w-200 min-h-50 border-4 rounded-xl">
  <p class="font-bold text-2xl uppercase mx-4 mt-2">{title}</p>
  <p class="text-lg mx-4 flex-1">{content}</p>
  <p class="bg-black text-white text-md w-full rounded-md text-center">{postdata}</p>
</div>
