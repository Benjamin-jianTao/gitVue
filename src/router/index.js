import { createRouter, createWebHistory } from "vue-router";
import NoteNews from "@/components/NoteNews.vue"

const routes = [
	{
	  path: "/noteNews",
	  name: "noteNews",
	  component: NoteNews
	},
	
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
