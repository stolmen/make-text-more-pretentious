from PyDictionary import PyDictionary
import random


# SHIT TO FIX:
# - fix casing
# - make faster
# - ignore proper nouns, etc.


def make_sentence_pretentious(sentence):
    words = sentence.split(' ')
    dictionary = PyDictionary(*words)
    things = dictionary.getSynonyms()

    pretentious_words = []
    for thong, orig_word in zip(things, words):
        if thong:
            synonyms = list(thong.values())[0]
            new_word = pick_one_randomly(synonyms)
        else:
            new_word = orig_word
        pretentious_words.append(new_word)
    return ' '.join(pretentious_words)


def pick_one_randomly(iterable):
    return random.sample(iterable, 1)[0]


print(make_sentence_pretentious('The quick brown fox jumps over the lazy dog'))
print(make_sentence_pretentious('Edward, you suck'))
print(make_sentence_pretentious('asdfw weqweqwe'))
