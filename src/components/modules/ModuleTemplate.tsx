import React, { ReactNode } from 'react';

interface ModuleSectionProps {
  title: string;
  children: ReactNode;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
};

interface ModuleTemplateProps {
  title: string;
  introduction: string;
  sections: {
    id: string;
    title: string;
    content: ReactNode;
  }[];
}

const ModuleTemplate: React.FC<ModuleTemplateProps> = ({ 
  title, 
  introduction, 
  sections 
}) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300">{introduction}</p>
      </div>
      
      {sections.map((section) => (
        <ModuleSection key={section.id} title={section.title}>
          {section.content}
        </ModuleSection>
      ))}
    </div>
  );
};

export default ModuleTemplate;
