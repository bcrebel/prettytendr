import { useForm, type SubmitHandler } from "react-hook-form";
import './form.css';

type FormValues = {
  hairTexture: string;
  skinType: string;
};

function BeautyProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3">
        <label className="question">What is your hair texture?</label>
        <div>
          <input
            type="radio"
            id="straight"
            value="Straight"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="straight">Straight</label>
        </div>
        <div>
          <input
            type="radio"
            id="wavy"
            value="Wavy"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="wavy">Wavy</label>
        </div>
        <div>
          <input
            type="radio"
            id="curly"
            value="Curly"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="curly">Curly</label>
        </div>
        <div>
          <input
            type="radio"
            id="coily"
            value="Coily"
            {...register("hairTexture", { required: true })}
          />
          <label htmlFor="curly">Curly</label>
        </div>
        {errors.hairTexture && isSubmitted && (
          <p style={{ color: "red" }}>A selection is required for hair texture.</p>
        )}
      </div>

      <div className="mt-3">
        <label className="question">What is your skin type?</label>
        <div>
          <input
            type="radio"
            id="dry"
            value="Dry"
            {...register("skinType", { required: true })}
          />
          <label htmlFor="dry">Dry</label>
        </div>
        <div>
          <input
            type="radio"
            id="oily"
            value="Oily"
            {...register("skinType", { required: true })}
          />
          <label htmlFor="oily">Oily</label>
        </div>
        <div>
          <input
            type="radio"
            id="combination"
            value="Combination"
            {...register("skinType", { required: true })}
          />
          <label htmlFor="combination">Combination</label>
        </div>
        {errors.skinType && isSubmitted && (
          <p style={{ color: "red" }}>A selection is required for skin type.</p>
        )}
      </div>

      <button className="bg-black text-white p-1 pl-4 pr-4 mt-5 text-sm" type="submit">
        Submit
      </button>
    </form>
  );
}


export default BeautyProfileForm;
