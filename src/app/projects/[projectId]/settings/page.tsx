"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DateValueType } from "react-tailwindcss-datepicker";
import { ProjectData, ImageType, WhitelistedAddress } from "../../../types";
import { NavBar } from "../../../components/dashboard";
import { 
  ProjectDetailsForm, 
  AffiliatesForm,
  LogoForm,
  SocialLinksForm,
  NextButton 
} from "../../../components/createProject";
import { fetchProjectData, updateProjectInFirestore } from "../../../utils/firebase";

export default function Settings({ params }: { params: { projectId: string } }) {
  const [initialProjectData, setInitialProjectData] = useState<ProjectData | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewData, setPreviewData] = useState({
    logoPreview: "",
    coverPreview: ""
  });

  useEffect(() => {
    fetchProjectData(params.projectId)
      .then(data => {
        setInitialProjectData(data);
        setProjectData(data);
        setLoadingProject(false);

        setPreviewData({
          logoPreview: data.logo || "",
          coverPreview: data.cover || ""
        });
      })
      .catch(error => {
        const message = (error instanceof Error) ? error.message : "Unknown error";
        console.error("Error loading the project: ", message);
        toast.error(`Error loading the project: ${message}`);
        setLoadingProject(false);
      });
  }, [params.projectId]);

  const handleImageChange = (type: ImageType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewData(prev => ({ ...prev, [`${type}Preview`]: reader.result as string }));
        setProjectData(prev => { 
          if (prev === null) return null;
          return {
            ...prev, 
            [type]: file 
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: ImageType) => () => {
    setPreviewData(prev => ({ ...prev, [`${type}Preview`]: "" }));
    setProjectData(prev => {
      if (prev === null) return null;
      return {
        ...prev, 
        [type]: "" 
      };
    });
  };

  const handleChange = (field: string, isNumeric?: boolean) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = isNumeric ? parseInt(event.target.value, 10) || 0 : event.target.value;
    setProjectData(prev => {
      if (prev === null) return null;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleDateChange = (newValue: DateValueType) => {
    setProjectData(prev => {
      if (prev === null) return null;
      let deadline = null;
      if (newValue?.startDate) {
        const date = new Date(newValue.startDate);
        date.setHours(23, 59, 59, 999);
        deadline = date;
      }
      return {
        ...prev,
        deadline,
      };
    });
  };

  // TODO: ホワイトリストアドレスを更新する関数。
  // - Reason: フォーム内で入出力するため。
  // - Planned Reversion: 未定。
  // - Date: 2024-05-17
  // - Author: shungo0222
  // - Issue: #316
  // ===== BEGIN MODIFICATION =====
  const handleWhitelistChange = (newWhitelistedAddresses: { [address: string]: WhitelistedAddress }) => {
    setProjectData(prevData => {
      if (prevData === null) return null;
      return {
        ...prevData,
        whitelistedAddresses: newWhitelistedAddresses
      }
    });
  };
  // ===== END MODIFICATION =====

  const hasChanges = () => {
    if (!initialProjectData || !projectData) return false;
  
    return JSON.stringify(initialProjectData) !== JSON.stringify(projectData);
  };

  const isFormComplete = () => {
    return projectData &&
      projectData.projectName.trim() !== "" &&
      projectData.description.trim() !== "" &&
      projectData.logo &&
      projectData.cover &&
      projectData.selectedTokenAddress.trim() !== "" &&
      // TODO: リワード量とリダイレクトリンクの検証を取り除いて、ホワイトリストの検証を追加する。
      // - Reason: ホワイトリストの中でそれぞれのアドレスに紐づいたトークン量とリンクを管理するため。
      // - Planned Reversion: 未定。
      // - Date: 2024-05-17
      // - Author: shungo0222
      // - Issue: #316
      // ===== BEGIN ORIGINAL CODE =====
      // projectData.rewardAmount > 0 &&
      // projectData.redirectUrl.trim() !== ""
      // ===== END ORIGINAL CODE =====
      // ===== BEGIN MODIFICATION =====
      Object.keys(projectData.whitelistedAddresses || {}).length > 0
      // ===== END MODIFICATION =====
  };

  const handleSaveChanges = async () => {
    if (isFormComplete() && projectData) {
      console.log("Saving changes...");
      try {
        const updatedData = await updateProjectInFirestore(
          params.projectId,
          projectData,
          setIsUpdating
        );
        setProjectData(updatedData);
        setInitialProjectData(updatedData);
        setPreviewData({
          logoPreview: `${updatedData.logo}`,
          coverPreview: `${updatedData.cover}`
        });
      } catch (error: any) {
        console.error("Failed to save changes:", error);
        toast.error("Failed to save changes: " + error.message);
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  return (
    <>
      <NavBar projectId={params.projectId} />
      <div className="min-h-screen bg-[#F8FAFC] px-4 sm:px-10 md:px-32 lg:px-60 xl:px-96 pt-1 pb-10">
        {loadingProject ? (
          <div className="flex flex-row items-center justify-center gap-5 mt-20">
            <Image src="/loading.png" alt="loading.png" width={50} height={50} className="animate-spin" /> 
            <p className="text-gray-500 font-semibold text-lg">Loading...</p>
          </div>
        ) : (
          <>
            <ProjectDetailsForm
              data={{
                projectName: `${projectData?.projectName}`,
                description: `${projectData?.description}`,
                totalSlots: projectData?.slots.total ?? 0,
                totalBudget: projectData?.budget.total ?? 0,
                deadline: projectData?.deadline ?? null
              }}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
            />
            <LogoForm
              data={{
                logoPreview: previewData.logoPreview,
                coverPreview: previewData.coverPreview
              }}
              handleImageChange={handleImageChange}
              removeImage={(type) => removeImage(type)}
            />
            <SocialLinksForm
              data={{
                websiteUrl: `${projectData?.websiteUrl}`,
                discordUrl: `${projectData?.discordUrl}`,
                xUrl: `${projectData?.xUrl}`,
                instagramUrl: `${projectData?.instagramUrl}`
              }}
              handleChange={handleChange}
            />
            <AffiliatesForm 
              data={{
                selectedTokenAddress: `${projectData?.selectedTokenAddress}`,
                whitelistedAddresses: projectData?.whitelistedAddresses ?? {}
              }}
              handleChange={handleChange}
              handleWhitelistChange={handleWhitelistChange}
            />
            <NextButton onClick={handleSaveChanges} disabled={!isFormComplete() || !hasChanges() || isUpdating}>
              {isUpdating ? (
                <div className="flex flex-row items-center justify-center gap-5">
                  <Image src="/loading.png" alt="loading.png" width={30} height={30} className="animate-spin" /> 
                  <p className="text-gray-500 font-semibold text-lg">Updating...</p>
                </div>
              ) : (
                <p>Save Changes</p>
              )}
            </NextButton>
          </>
        )}
      </div>
    </>
  );
}