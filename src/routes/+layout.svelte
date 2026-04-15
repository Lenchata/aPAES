<script lang="ts">
  import '../app.css';
  import AuthGate from '$lib/components/AuthGate.svelte';
  let { children } = $props();
</script>

<AuthGate>
  {@render children()}
</AuthGate>
