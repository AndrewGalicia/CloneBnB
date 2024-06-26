'use client'
import { useMemo, useState } from "react";
import Modal from "./Modal";

import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../NavBar/Categories";
import CategoryInput from "../Inputs/CatergoryInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
;

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router =useRouter();
    const rentModal = useRentModal();

    const  [step, setStep]= useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category:  '',
            location: null,
            guestCount: 0,
            roomCount: 0,
            bathroomCount: 0,
            imageSrc: '',
            price: 1,
            title:'',
            description:''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount= watch('guestCount')
    const roomCount= watch('roomCount')
    const bathroomCount= watch('bathroomCount')
    const imageSrc=watch('imageSrc')
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr:false
    }), [location])

    const setCustomValue =(id: string, value: any) => {
        setValue(id, value, {
            shouldDirty:true,
            shouldTouch: true,
            shouldValidate: true
        })
    };

    const onBack = () => {
        setStep((value) => value -1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went Wrong');
        } ).finally(() => {setIsLoading(false);           
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next';   
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
            title="Which of these best describes your place"
            subtitle="Pick a category"
            />
        
        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        ">
    
        {categories.map((item) => (
            <div key={item.label} className="col-span-1">
                <CategoryInput
                onClick={(category)=>setCustomValue('category', category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}/> 
            </div>
        ))}
        </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="relative z-10">
                <Heading
                    title="Where is your place located"
                    subtitle="Help guest find you!"
                />
                <CountrySelect
                value={location}
                    onChange={(value) => setCustomValue('location', value)}/>
                    <Map
                    center={location?.latlng}/>
            </div>
                
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Share some basics about your place "
                subtitle="What amenities do you have?"
                />
                <Counter
                    title="Number of guests"
                    subtitle="how many bears do you allow"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}   
                    />
                    <hr />
                <Counter
                    title="Number of rooms"
                    subtitle="how many caverooms do you allow"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}   
                    />
                    <hr />
                <Counter
                    title="Number of bathrooms"
                    subtitle="how many cave bathrooms do you allow"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}   
                    />
                    <hr />

            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div
            className="flex flex-col gap-9">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your cave looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={value => setCustomValue('imageSrc', value)}
                    />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe this cave"
                    subtitle="Short and sweet works best"/>
                 <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required/>   
                 <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required/>   
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much is your cave"/>
                 <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />   
            </div>
        )
    }
    return(
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        
        secondaryAction={step === STEPS.CATEGORY ? undefined: onBack}
        title="Airbnb your home"
        body={bodyContent}
        />
    );
}

export default RentModal;