"use client";

import { useState } from "react";

import { StatusBarComponent } from "../../components/statusbar/StatusBarComponent";
import { 
  ProjectDetailsForm,
  AffiliatesForm,
  LogoForm,
  SocialLinksForm
} from "../../components/createProject";

export default function CreateProject() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    slug: "my-project",
    description: "",
    selectedToken: "",
    rewardAmount: "",
    redirectUrl: "",
    logo: "",
    cover: "",
    websiteUrl: "",
    discordUrl: "",
    twitterUrl: "",
    instagramUrl: ""
  });

  const [previewData, setPreviewData] = useState({
    logoPreview: "",
    coverPreview: ""
  });

  const handleImageChange = (type: "logo" | "cover") => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewData(prev => ({ ...prev, [`${type}Preview`]: reader.result as string }));
        setProjectData(prev => ({ ...prev, [type]: file }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = (type: "logo" | "cover") => () => {
    setPreviewData(prev => ({ ...prev, [`${type}Preview`]: "" }));
    setProjectData(prev => ({ ...prev, [type]: "" }));
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProjectData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const [currentStep, setCurrentStep] = useState(4);

  return (
    <div className="flex flex-col">

      <StatusBarComponent currentStep={currentStep} />

      {currentStep === 1 &&
        <ProjectDetailsForm
          data={{
            projectName: projectData.projectName,
            slug: projectData.slug,
            description: projectData.description
          }}
          handleChange={handleChange}
        />
      }

      {currentStep === 2 &&
        <AffiliatesForm 
          data={{
            selectedToken: projectData.selectedToken,
            rewardAmount: projectData.rewardAmount,
            redirectUrl: projectData.redirectUrl
          }}
          handleChange={handleChange}
        />
      }

      {currentStep === 3 &&
        <LogoForm
          data={{
            logoPreview: previewData.logoPreview,
            coverPreview: previewData.coverPreview
          }}
          handleImageChange={handleImageChange}
          removeImage={(type) => removeImage(type)}
        />
      }

      {currentStep === 4 &&
        <SocialLinksForm
          data={{
            websiteUrl: projectData.websiteUrl,
            discordUrl: projectData.discordUrl,
            twitterUrl: projectData.twitterUrl,
            instagramUrl: projectData.instagramUrl
          }}
          handleChange={handleChange}
        />
      }

    </div>
  );
}