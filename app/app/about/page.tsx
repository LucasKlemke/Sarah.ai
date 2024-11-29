import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sobre</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sarah AI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sarah AI é um projeto de código aberto desenvolvido em colaboração
            com estudantes de faculdades de medicina brasileiras. Seu principal
            objetivo é agilizar o processo de extração de dados de pacientes,
            permitindo que os médicos tomem decisões mais informadas e precisas.
            Ao aproveitar ferramentas avançadas de IA, Sarah AI visa aumentar a
            eficiência diagnóstica e apoiar os profissionais de saúde na
            entrega de melhores resultados de saúde. Este projeto enfatiza a
            acessibilidade e a inovação, contribuindo para a crescente
            interseção entre tecnologia e medicina.
          </p>
        </CardContent>
      </Card>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Participe</h2>
        <p className="mb-6 text-muted-foreground">
          Aceitamos contribuições de desenvolvedores de todos os níveis de
          experiência. Junte-se à nossa comunidade hoje!
        </p>
        <Button asChild>
          <Link href="https://github.com/LucasKlemke/Sarah.ai">
            <Github className="w-4 h-4 mr-2" />
            Ver no GitHub
          </Link>
        </Button>
      </section>
    </div>
  );
}
