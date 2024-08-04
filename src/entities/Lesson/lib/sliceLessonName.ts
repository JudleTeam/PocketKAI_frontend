
export function sliceLessonName(lesson_name: string):string{
    const maxLength = 40;
    if(lesson_name.length < maxLength){
        return lesson_name
    }
    return lesson_name.slice(0, maxLength - 3).trim() + '...';
}