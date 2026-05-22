import type { Note } from '../types';

/** Starter notes shown once when the user has no saved notes yet. */
export function getSeedNotes(): Note[] {
  const base = Date.now();

  return [
    {
      id: 'seed-why-me',
      title: 'Why pick me for this role',
      body: `I've got enough experience to build apps that are actually secure not just "looks fine in a demo."

When it makes sense and doesn't weaken security, I use the right tools and shortcuts to move faster usually around 30–40% quicker on the parts that don't need to be hand-crafted. The rest I do properly.

App development has always fascinated me. That's why I often take the harder route when it leads to something more solid, even if a shortcut would look fine on paper.`,
      createdAt: base,
      updatedAt: base,
    },
    {
      id: 'seed-good-fit',
      title: 'Good fit if you need…',
      body: `A full stack React Native hire makes sense when the team wants someone who can:

→ Ship the mobile experience and understand the API behind it
→ Jump between UI tweaks and integration work in the same week
→ Keep things simple  no over-engineered state for a notes app, and no chaos on a real product either

Happy to walk through projects.`,
      createdAt: base + 2,
      updatedAt: base + 2,
    },
  ];
}
