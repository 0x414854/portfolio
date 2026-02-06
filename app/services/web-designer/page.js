import ServicePage from "@/app/components/servicePage";
import ImageT from "@/public/projects/bitcoinPrice.png";

export default function ConceptionWeb() {
  return (
    <ServicePage
      title="Conception Web"
      subtitle="Boostez votre présence en ligne avec un site web moderne, performant et sur mesure"
      image={ImageT}
      benefits={[
        "Site 100% responsive, adapté à tous les écrans (mobile, tablette, ordinateur)",
        "Design moderne et entièrement personnalisé à votre marque",
        "Optimisé pour la conversion et l’expérience utilisateur, pour générer plus de contacts et ventes",
        "Sécurisé et performant, pour un chargement rapide et fiable",
        "Structure SEO-friendly pour améliorer votre visibilité sur Google",
        "Intégration facile de contenus et de fonctionnalités évolutives",
        "Accompagnement et conseils personnalisés pour un site adapté à vos objectifs",
        "Maintenance et suivi possibles en option pour garantir le bon fonctionnement sur le long terme",
        "Design professionnel qui inspire confiance et crédibilité auprès de vos clients",
        "Flexibilité pour ajouter de nouvelles fonctionnalités à tout moment",
      ]}
      steps={[
        {
          title: "Consultation & Analyse",
          description:
            "Nous commençons par comprendre votre activité, vos objectifs et vos clients pour définir un site web sur mesure qui répond réellement à vos besoins.",
        },
        {
          title: "Design & Maquettes",
          description:
            "Nous créons des maquettes modernes, intuitives et centrées sur l’expérience utilisateur, afin de maximiser l’impact et la conversion dès le premier regard.",
        },
        {
          title: "Développement & Intégration",
          description:
            "Nous transformons les maquettes en un site web performant, sécurisé et responsive, optimisé pour le référencement naturel et des temps de chargement ultra rapides.",
        },
        {
          title: "Tests & Optimisation",
          description:
            "Avant la mise en ligne, nous testons toutes les fonctionnalités, la compatibilité mobile et la vitesse pour garantir un site fiable et fluide pour vos visiteurs.",
        },
        {
          title: "Livraison & Support",
          description:
            "Nous mettons votre site en ligne, vous formons à son utilisation et assurons un suivi post-lancement. Un accompagnement et une maintenance optionnelle sont disponibles pour garantir son succès sur le long terme.",
        },
      ]}
      testimonials={{
        logos: [
          "/logo/viceversaLogo.png",
          "/logo/myvisionboard.png",
          "/logo/CDOLogo.png",
        ],
        featured: {
          content:
            "J'ai fait appel à M. Arthur Barraud pour refaire le site internet de notre atelier. Je suis extrêmement satisfaite du résultat qui a dépassé nos attentes. Conseils avisés et très professionnels. Rapidité de construction et de mise en ligne. Je recommande vivement cette toute jeune entreprise!",
          name: "Vice Versa Atelier",
        },
      }}
      faq={[
        {
          question: "Combien de temps faut-il pour créer un site web ?",
          answer:
            "La réalisation d’un site sur-mesure standard prend en moyenne 2 semaines. Le délai peut être ajusté selon la complexité du projet et vos besoins particuliers, pour garantir un résultat parfait.",
        },
        {
          question: "Puis-je gérer mon site moi-même après livraison ?",
          answer:
            "Selon vos préférences, nous pouvons gérer toutes les mises à jour de votre site pour vous, ou vous fournir une interface intuitive qui vous permet de modifier textes, images et contenus en toute autonomie.",
        },
        {
          question: "Est-ce que mon site sera optimisé SEO ?",
          answer:
            "Absolument ! Chaque site est conçu avec des balises, structures et temps de chargement optimisés pour un meilleur référencement naturel.",
        },
        {
          question: "Le site sera-t-il compatible mobile et tablette ?",
          answer:
            "Oui, tous nos sites sont 100% responsive et s’adaptent parfaitement à tous les écrans, du smartphone à l’ordinateur.",
        },
        {
          question: "Puis-je choisir le design et les couleurs de mon site ?",
          answer:
            "Bien sûr ! Nous créons un design sur mesure adapté à votre identité visuelle et à votre image de marque.",
        },
        {
          question:
            "Que se passe-t-il si je veux ajouter de nouvelles fonctionnalités plus tard ?",
          answer:
            "Votre site est développé de façon modulaire, ce qui permet d’ajouter facilement des fonctionnalités supplémentaires ultérieurement.",
        },
        {
          question: "Le site sera-t-il sécurisé ?",
          answer:
            "Oui, nous appliquons les meilleures pratiques en matière de sécurité pour protéger vos données et celles de vos clients.",
        },
        {
          question: "Proposez-vous un suivi après la mise en ligne ?",
          answer:
            "Oui, nous assurons un accompagnement post-lancement pour corriger les bugs éventuels et optimiser les performances. Si vous le souhaitez, nous proposons également un suivi et une maintenance régulière de votre site en option, pour garantir son bon fonctionnement et ses mises à jour sur le long terme.",
        },
        {
          question:
            "Est-ce que vous fournissez un hébergement ou un nom de domaine ?",
          answer:
            "Votre site bénéficie d’un hébergement gratuit inclus. Le nom de domaine est à prévoir en supplément, mais nous prenons en charge toute la configuration pour que votre site soit en ligne rapidement et sans effort de votre part.",
        },
      ]}
      cta={{
        title: "Boostez votre présence en ligne dès aujourd’hui",
        p: "Obtenez un site web sur mesure, rapide et optimisé pour attirer plus de clients et générer des résultats concrets.",
        button: "Obtenez votre devis gratuit",
      }}
    />
  );
}
